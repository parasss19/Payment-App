const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  
  