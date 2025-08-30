import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/connectDB.js';
import cookieParser from "cookie-parser";

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import accountRouter from './routes/accountRoutes.js';
// import paymentsRouter from './routes/paymentsRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

//CORS and cookies
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(cookieParser());

//JSON body parser
app.use(express.json());

//handling routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/account', accountRouter);
// app.use('/api/v1/payments', paymentsRouter);


app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
})
