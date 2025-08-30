import { Router } from "express";
import { validateRegister, validateLogin } from "../middleware/validator.js"; 
import { isAuthenticated, login, logout, register } from "../controllers/authControllers.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import userAuth from "../middleware/userAuth.js";


const router = Router();

//signup - /api/v1/auth/signup
router.post("/signup", rateLimiter, validateRegister, register);

//login - /api/v1/auth/signin
router.post("/signin", rateLimiter, validateLogin, login);

//logout - /api/v1/auth/logout
router.post("/logout", logout);

//check if user is authenticated
router.get('/isAuth', userAuth, isAuthenticated);


export default router; 