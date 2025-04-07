const { Router } = require("express");

const userMiddleware = require("../middlewares/userMiddleware");
const { AccountModal, UserModal } = require("../db/db");
const { default: mongoose } = require("mongoose");

const router = Router();


//An endpoint for getting receiver person details here we pass receiver id in params
router.get("/receiverdetails/:userId", userMiddleware, async (req, res) => {
    const userId = req.params.userId; //extract receiver's id from params
    try {
      //find if receiver exist in our db if exist than send his/her name as response
      const receiver = await UserModal.findById(userId);
      console.log(receiver);
  
      const name = receiver.firstName;
      return res.status(200).json({
        name: name,
      });
    } catch (error) {
      return res.json({
        msg: "Error while fetching receivers details",
        error,
      });
    }
});
  

//An endpoint for user to get their balance. route = /api/v1/account/balance
router.get("/balance", userMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
      const account = await AccountModal.findOne({ userId: req.userId }).populate( "userId");
      //console.log(account);
      return res.json({
        msg: "Successfully fetch balance",
        balance: account.balance,
        firstName: account.userId.firstName,
      });
    } catch (error) {
      return res.json({
        msg: "Error in fetching balance",
        balance: null,
      });
    }
});




module.exports = router;