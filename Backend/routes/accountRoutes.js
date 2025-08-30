import { Router } from "express";
import userAuth from "../middleware/userAuth.js";
import { balance, transfer, p2pTransactions, walletTransactions, addFunds } from "../controllers/accountControllers.js";
import { validateTransfer } from "../middleware/validator.js";

const router = Router();

//balance for logged-in user
router.get("/balance", userAuth, balance);


// ------------------ P2P transactions routes ------------------
//transfer money to others
router.patch("/transfer", userAuth, validateTransfer, transfer);

//fetch p2p transactions
router.get("/p2pTransactions", userAuth, p2pTransactions);


// ------------------ add money to wallet routes ------------------
//add funds to wallet
router.patch("/addFunds", userAuth, addFunds);

//fetch wallet transactions
router.get("/walletTransactions", userAuth, walletTransactions);

export default router;