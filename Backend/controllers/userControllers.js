import bcrypt from "bcrypt";
import UserModel from "../model/userModel.js";

export const update = async (req, res) => {
  const { newFirstName, newusername, newPassword } = req.validatedData;
  const userId = req.userId;

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
    return res.status(400).json({ message: "No input received" });
  }

  try {
    // Only check if new username is provided
    if (newusername) {
      const existingUser = await UserModel.findOne({
        username: newusername,
        _id: { $ne: userId },
      });

      //if user already present
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already taken. Choose another",
        });
      }
    }

    //Update user and return updated object
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }  
    ).select("-password");  //exclude password

    return res.status(200).json({
      success: true,
      message: "Updated info successfully",
      user: updatedUser,
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating",
    });
  }
};

export const filter = async (req, res) => {
  const filter = req.query.filter || "";    //we send filter query in req obj
  const currentUserId = req.userId;        //userAuth return user object which also have id field
  
  try {
    let users;
    
    //if filter is not applied, show all users except current user
    if(!filter){
      users = await UserModel.find(
        {
          _id: {  $ne: currentUserId }  //exclude current user
        })
        .select("username firstName lastName"); 
    }

    //now if filter is applied than search the user in db using firstName(case-insensitive)
    else{
      users = await UserModel.find({
        firstName: { $regex: filter, $options: "i" },
        _id: { $ne: currentUserId }, //exclude current user
      }).select("username firstName lastName");; 
    }

    //if the filter user not found in db
    if (!users || users.length === 0) {
      return res.status(404).json({
        success:false,
        message: "No matching user Found",
      });
    }

    //send filterdUsers with our response
    return res.status(200).json({
      users,
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching users",
    });
  }
};
