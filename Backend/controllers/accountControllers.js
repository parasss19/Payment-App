import userModel from "../model/userModel.js";
import accountModel from "../model/accountModel.js";
import mongoose from "mongoose";


// fetch balance 
export const balance = async (req, res) => {
    const userId = req.userId;
    try {
      const account = await accountModel.findOne({ userId }).populate("userId");
      
      if (!account) {
        return res.status(404).json({
          message: "Account not found",
        });
      }

      return res.json({
        message: "Successfully fetch balance",
        balance: account.balance,
      });
    } 
    catch (error) {
      return res.json({
        message: "Error in fetching balance",
        balance: null,
      });
    }
}

// ------------------ P2P transactions controllers ------------------
export const transfer = async (req, res) => {
  const senderId = req.userId;
  const { receiverId, amount, pin } = req.body;
    
  //Validate PIN
  const senderUser = await userModel.findById(senderId);
  if (!senderUser) {
    return res.status(404).json({success:false, message: "Sender not found" });
  }
  if (senderUser.pin !== pin.trim()) {
    return res.status(400).json({ success:false, message: "Invalid PIN" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderAccount = await accountModel.findOne({ userId: senderId }).session(session);
    const receiverAccount = await accountModel.findOne({ userId: receiverId }).session(session);

    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({success:false, message: "Insufficient balance" });
    }

    if (!receiverAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({success:false, message: "Receiver account not found" });
    }

    //Update balances
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    //Log transactions
    senderAccount.transactions.push({
      type: "debit",
      amount,
      category: "p2p",
      fromUser: senderId,
      toUser: receiverId,
    });

    receiverAccount.transactions.push({
      type: "credit",
      amount,
      category: "p2p",
      fromUser: senderId,
      toUser: receiverId,
    });

    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json({ 
      success:true, 
      message: `₹${amount} Send successfully 🎉`,
    });
  } 
  catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      success:false,
      message: "Transaction failed",
      error: error.message,
    });
  }
};

export const p2pTransactions = async (req, res) => {
  try {
    const account = await accountModel.findOne({ userId: req.userId })
      .populate("transactions.fromUser", "username firstName lastName")
      .populate("transactions.toUser", "username firstName lastName");

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }
    
    //sort transaction in descending order
    const p2pTxns = account.transactions.filter(txn => txn.category === "p2p").sort((a, b) => b.date - a.date);

    const formatted = p2pTxns.map(t => ({
      _id: t._id,
      type: t.type,
      amount: t.amount,
      // createdAt: t.date, 
      date: t.date,
      fromUser: t.fromUser,
      toUser: t.toUser,
    }));

    res.json({
      success: true,
      transactions: formatted,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}


// ------------------ Wallet(add money) Controllers ------------------
export const addFunds = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { amount, pin } = req.body;

    //1 Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        errors: [{ field: "amount", message: "Enter a valid amount" }],
      });
    }

    //2 Validate user & PIN
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!pin || user.pin !== pin.trim()) {
      return res.status(400).json({
        success: false,
        errors: [{ field: "pin", message: "Invalid PIN" }],
      });
    }

    //3 Fetch account
    const account = await accountModel.findOne({ userId });
    if (!account) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    //4 Update balance & push transaction
    account.balance += Number(amount);

    account.transactions.push({
      type: "credit",
      amount: Number(amount),
      category: "wallet",
      source: "System", 
    });

    await account.save();

    //5 Send response
    res.status(200).json({
      success: true,
      message: `₹${amount} added successfully 🎉`,
      balance: account.balance,
    });

  } 
  catch (error) {
    console.error("addFunds error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const walletTransactions = async (req, res) => {
  try {
    const account = await accountModel.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // Filter: only transactions with fromSystem/toSystem (wallet top-ups ) not p2p transactions
    const walletTxns = account.transactions.filter(txn => txn.category === "wallet");

    //Sort transactions by latest first
    const sortedTxns = walletTxns.sort((a, b) => b.date - a.date);

    const formattedTxns = sortedTxns.map((txn) => ({
      id: txn._id,
      title: "Added Funds",
      amount: txn.type === "credit" ? `+ ₹${txn.amount}` : `- ₹${txn.amount}`,
      date: new Date(txn.date).toDateString(), //"Wed Aug 20 2025"
    }));

    res.status(200).json({
      success: true,
      transactions: formattedTxns,
    });
  } 
  catch (error) {
    console.error("Error fetching wallet transactions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
