const express = require('express');
const cors = require('cors');

const app = express();

//import routes
const userRouter = require('./routes/userRoutes')
const accountRouter = require('./routes/accountRoutes')


// Middleware for parsing request bodies
app.use(cors());
app.use(express.json()); 

//handling routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/account', accountRouter);

module.exports = app;