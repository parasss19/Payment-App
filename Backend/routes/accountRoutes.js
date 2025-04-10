const { Router } = require("express");

const userMiddleware = require("../middleware/userMiddleware");
const { AccountModal, UserModal } = require("../db/db");
const { default: mongoose } = require("mongoose");

const router = Router();


//An endpoint for getting receiver person details here we pass receiver id in params
router.get("/receiverdetails/:userId", userMiddleware, async (req, res) => {
    const userId = req.params.userId; //extract receiver's id from params
    try {
      //find if receiver exist in our db if exist than send his/her name as response
      const receiver = await UserModal.findById(userId);
      //console.log(receiver);
  
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



//An endpoint for user to transfer money to another account. route = /api/v1/account/transfer
router.patch("/transfer", userMiddleware, async (req, res) => {
    const senderId = req.userId;
    const { recieverId, amount } = req.body; 
  
    if (!recieverId || !amount) {
      return res.json({ msg: "Missing required fields" });
    }
  
    try {
      const session = await mongoose.startSession(); //start session
      session.startTransaction();                    //start the transaction
  
      const senderAccount = await AccountModal.findOne({ userId: senderId }).session(session);
      const reciverAccount = await AccountModal.findOne({ userId: recieverId }).session(session);
  
  
      //if senderr not found or balance of sender is less than amount to be transferred
      if (!senderAccount || senderAccount.balance < amount) {
        await session.abortTransaction()  //abort transaction
        session.endSession();
        return res.status(400).json({
          msg: "Insufficient Account Balance",
        });
      }
  
      //if recevier not found
      if (!reciverAccount) {
        await session.abortTransaction()  //abort transaction
        session.endSession();
        return res.status(400).json({
          msg: "Receiver account not found",
        });
      }
      
      //Decrement the amount of sender
      await AccountModal.updateOne(
        { userId: senderId },
        { $inc: { balance: -amount } }
      ).session(session);
  
      //Increment the amount of receiver
      await AccountModal.updateOne(
        { userId: recieverId },
        { $inc: { balance: amount } }
      ).session(session);
  
      //Commit the transaction
      await session.commitTransaction();
      session.endSession()
      res.status(200).json({
        msg: "Transaction successful",
      });
    } 
    catch (error) {
      await session.abortTransaction()
      session.endSession()
      return res.status(500).json({
        msg : "Transcation failed due to an error", error
      })
    }
});


module.exports = router;