import mongoose from "mongoose";
 
// Define mongoose schemas for Users
const userSchema = new mongoose.Schema({
    //username is email basically
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    pin: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 4,
      unique: true,
    }
 },
  {timestamps: true}
);

export default mongoose.model('User', userSchema);