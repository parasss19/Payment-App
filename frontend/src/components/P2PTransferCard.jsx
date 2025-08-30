import { MyContext } from "@/context/MyContext";
import axios from "axios";
import { Send } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";


const P2PTransferCard = () => {
  const {backendURL, fetchBalance, fetchP2pTransactions} = useContext(MyContext);

  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState();
  const [pin, setPin] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});      //to show each field error coming from backend


  const sendMoneyHandler = async () => {
    setLoading(true);
    setErrors({}); // clear previous errors
    
    try {
      const {data} = await axios.patch(`${backendURL}/api/v1/account/transfer`,
        {
          receiverId, 
          amount: Number(amount),   //make sure backend get amount as number
          pin:pin.trim()        //remove spaces
        },
        {withCredentials: true} 
      )

      if(data.success){
        toast.success(data.message || "Transfer successful🎉");
        fetchBalance(); 
        fetchP2pTransactions();
        setReceiverId("");
        setAmount("");
        setPin("");  
      }
    } 
    catch (error) {
      if (error.response.data) {
        const { errors, message } = error.response.data;

        //If backend sends field errors than map over all error
        if (errors) {
          const newErrors = {};
          errors.forEach(err => {
            newErrors[err.field] = err.message;
          });
          setErrors(newErrors);
        }else if (message) {
          toast.error(message);   //show error message like "Insufficient balance" coming from my transfer controller
        }
      }
      else {
        toast.error("Something went wrong ❌");
      }
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-[Geist] text-gray-700">P2P Transfer</h2>
        <Send className="w-5 h-5 text-blue-500" />
      </div>

      {/* Recipient */}
      <input
        type="text"
        placeholder="Enter recipient ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none font-[Geist]"
      />
      {errors.receiverId && <p className="text-xs text-red-500">{errors.receiverId}</p>}

      {/* Amount */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none font-[Geist]"
      />
      {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}

      {/* Pin */}
      <input
        type="text"
        maxLength={4}
        placeholder="Enter Pin"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none font-[Geist]"
      />
      {errors.pin && <p className="text-xs text-red-500">{errors.pin}</p>}

      {/* Button */}
      <button 
        onClick={sendMoneyHandler}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition"
      >
        {loading 
          ? (
            <div className="flex items-center justify-center gap-2">
              <Loader />
              <span>Processing...</span>
            </div>
          ) 
          : ("Send Money")
        }
      </button>
    </div>
  );
};

export default P2PTransferCard;
