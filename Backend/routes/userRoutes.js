import { Router } from "express";
import userAuth from "../middleware/userAuth.js";
import { validateUpdate } from "../middleware/validator.js"; 
import { filter, update } from "../controllers/userControllers.js";


const router = Router();

//update user information : /api/v1/user/updateInfo
router.patch("/updateInfo", userAuth, validateUpdate, update);

//get users from db : /api/v1/user/filterUser
router.get("/filterUser", userAuth, filter);

export default router; 