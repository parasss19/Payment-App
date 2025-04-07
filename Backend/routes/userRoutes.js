const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userMiddleware = require("../middlewares/userMiddleware");
const {UserModal, AccountModal} = require('../db/db');

const router = Router();

//Zod schema validation
const signupValidation = zod.object({
  firstName: zod.string().trim(),
  lastName: zod.string().trim(),
  username: zod.string().trim().email(),
  password: zod.string().trim().min(6),
});

const signinValidation = zod.object({
    username: zod.string().trim().email(),
    password: zod.string().trim().min(6),
});

const updateValidation = zod.object({
    newFirstName: zod.string().trim().optional(),
    newPassword: zod.string().trim().optional(),
    newusername: zod.string().trim().email().optional(),
});



//[auth routes]
//route = /api/v1/user/signup
router.post("/signup", async (req, res) => {
    const createPayload = req.body;
  
    const parsePayload = signupValidation.safeParse(createPayload);
  
    //if zod validation failed (i.e user provide false inputs)
    if (!parsePayload.success) {
      return res.status(411).json({
        msg: "validation failed / Incorrect inputs",
      });
    }
  
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
    try {
      //check if user already exists
      const isUserExist = await UserModal.findOne({
        username: req.body.username,
      });
  
      //if user already exist
      if (isUserExist) {
        return res.status(411).json({
          msg: "User with this username already exists",
        });
      } else {
        //if User not exist than create new user
        const newUser = await UserModal.create({
          username: req.body.username,
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          password: hashedPassword,
        });

        const userId = newUser._id; 
        //Create new Account when user signup and initialize with balance btw 1 to 10k
        await AccountModal.create({
          userId: userId,
          balance: Math.round(2000 + Math.random() * 10000),
        });

        const token = jwt.sign({ userId }, process.env.JWT_SECRET);
        return res.status(201).json({
          msg: "Signed Up successfully!",
          token: token,
        });
      }
    } catch (error) {
      return res.json({ msg: "Error while creating user", error });
    }
});


//route = /api/v1/user/signin
router.post("/signin", async (req, res) => {
    const createPayload = req.body;
    const parsePayload = signinValidation.safeParse(createPayload);
  
    //check shcema validation , if zod validation failed (i.e user provide false inputs)
    if (!parsePayload.success) {
      return res.status(400).json({
        msg: "Incorrect inputs",
      });
    }
  
    //check if email is correct
    const user = await UserModal.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({
        msg: "Invalid Email",
      });
    }
  
    //check correct password provided or not
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid Password",
      });
    }
  
    try {
      //if user present in db then Generate JWT token and send token to user
      const userId = user._id;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET);
      return res.status(200).json({
        msg: `Welcome ${user.firstName}`,
        token: token,
      });
    } catch (error) {
      return res.json({
        msg: "error while logginIN",
      });
    }
});
  
//[User Route]

//Route to update user information : route = /api/v1/user/updateInfo
router.patch("/updateInfo", userMiddleware, async (req, res) => {
    const createPayload = req.body;
    const parsePayload = updateValidation.safeParse(createPayload);
  
    //if zod validation fails
    if (!parsePayload.success) {
      return res.status(411).json({
        msg: "Error while updating information",
      });
    }
  
    //extract values from req.body
    const { newFirstName, newusername, newPassword } = req.body;
  
    //this obj store all updated values
    const updatedFields = {};
  
    //Only add fields to update if they are not undefined or empty
    if (newFirstName) updatedFields.firstName = newFirstName;
    if (newusername) updatedFields.username = newusername;
    if (newPassword) {
      const hashedPass = await bcrypt.hash(newPassword, 10);
      updatedFields.password = hashedPass;
    }
  
    //if updatedFields have no input
    if (Object.keys(updatedFields).length === 0) {
      return res.json({ msg: "No input received" });
    }
  
    const userId = req.userId;
  
    try {
      //find the user using userId
      const existingUser = await UserModal.findOne({
        $or: [  
          { userName: newusername },   //find user through their username(email) which is unique for every user
        ],
        _id: { $ne: userId }, //exclude current user
      });
  
      //if user already present
      if (existingUser) {
        if (newFirstName == existingUser.firstName) {
          return res.json({ msg: "Firstname already taken. Choose another" });
        }
        if (newusername == existingUser.username) {
          return res.json({ msg: "Email already taken. Choose another" });
        }
      }
      else {
        await UserModal.findByIdAndUpdate(userId, { $set: updatedFields } );
        return res.status(200).json({
          msg: "Updated info successfully",
        });
      }
    } catch (error) {
      return res.json({msg: "Error while updating",error: error.message})
    }
});


//Route to get users from db : route = /api/v1/user/filterUser
router.get("/filterUser", userMiddleware, async (req, res) => {
    //we send filter query in req obj
    const filter = req.query.filter || "";
    //console.log("Filter received:", filter);
  
    try {
      //if filter is not applied than show all users in dashboard
      if (!filter) {
        const allusers = await UserModal.find({
          _id: { $ne: req.userId },
        });
        return res.json({ allusers });
      }
  
      //now if filter is applied than search the user in db using firstName
      const user = await UserModal.find(
        { 
          firstName: { 
            $regex: filter, 
            $options: "i" 
          }
        })
      console.log(user);
      
      //if the filter user not found in db
      if (user.length === 0) {
        return res.json({
          msg: "No matching user Found",
        });
      }
  
      //if the filter user found in db then get filtered user
      const filterdUsers = user.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }));
  
      //send filterdUsers with our response
      return res.status(200).json({
        user: filterdUsers,
      });
    }
    catch (error) {
      return res.status(500).json({
        error : "Error occurred while fetching users",
      });
    }
});


module.exports = router  