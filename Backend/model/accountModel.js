import mongoose from "mongoose";

//mongoose schemas for Transactions
const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  amount: { type: Number, required: true },

  //Transaction category
  category: {
    type: String,
    enum: ["wallet", "p2p"],  //wallet top-up or peer-to-peer
    required: true,
  },

  //P2P transactions
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  

  //Wallet transactinos
  source: { type: String, default: "System" },

  date: { type: Date, default: Date.now },
});


//mongoose schemas for Account
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //reference is our User table
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true,
    default:0,
    min: 0,
  },
  transactions: [transactionSchema],
},
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
