import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import accountModel from "../model/accountModel.js";
import UserModel from "../model/userModel.js";

export const register = async (req, res) => {
  const { username, firstName, lastName, password } = req.validatedData;

  try {
    //check if user already exists
    const isUserExist = await UserModel.findOne({ username });

    //if user already exist
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    //if user not exist

    //hashed the pass of new user
    const hashedPassword = await bcrypt.hash(password, 10);

    //generate random 4-digit PIN
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    //create new user in db
    const newUser = await UserModel.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
      pin,
    });

    //Create new Account when user signup and initialize with balance btw 1 to 10k
    await accountModel.create({
      userId: newUser._id,
      balance: Math.floor(10000 + Math.random() * 10000) + 1,
    });

    //generate jwt token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send the token to user response and in response we have cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days expiry of cookie
    });

    return res.status(201).json({
      success: true,
      message: "Signed Up successfully!",
      pin,
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.validatedData;

  try {
    //check if user exists in db or not
    const user = await UserModel.findOne({ username });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    //if user exist

    //First check correct password provided or not
    const isMatch = await bcrypt.compare(password, user.password);

    //if password is not correct
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    //if password is correct then logged user in
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send the token to user response and in response we have cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days expiry of cookie
    });

    return res.json({
      message: "Logged in",
      success: true,
    });
  } 
  catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async(req, res) => {
    try {
      //clear cookie from response
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })

      return res.json({
        success: true,
        message: "Logged Out",
      })
    } 
    catch (error) {
      return res.json({
        success: false,
        message: error.message,
      })
    }
}

export const isAuthenticated = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
