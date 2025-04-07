const mongoose = require('mongoose');

//connect to db
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
 .then(() => {
    console.log("MongoDB connected successfully.");
 })
 .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.error("Cause:", err.cause);
 });

 
// Define mongoose schemas for Users
const userSchema = new mongoose.Schema({
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
    }
});

// Define mongoose schemas for Account
const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',     //reference is our User table
        required: true
    },
	balance: {
        type: Number,
        required: true
    }
})

// Create a model from the schema
const UserModal = mongoose.model('User', userSchema);
const AccountModal = mongoose.model('Account', AccountSchema);

module.exports = {UserModal, AccountModal};
