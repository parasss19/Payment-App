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

