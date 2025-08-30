import { MyContext } from '@/context/MyContext';
import axios from 'axios';
import { BadgeIndianRupee } from 'lucide-react'
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from './Loader';


const AddFundsCard = () => {
  const {backendURL, fetchBalance, fetchWalletTransactions} = useContext(MyContext);

  const [amount, setAmount] = useState();
  const [pin, setPin] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); 


  const addMoneyHandler = async () => {
    setLoading(true);
    setErrors({});

    try {
      const { data } = await axios.patch(`${backendURL}/api/v1/account/addFunds`,
        { amount, pin },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Money added successfully🎉");
        fetchBalance();
        fetchWalletTransactions();
        setAmount("");
        setPin("");
      }
    } catch (error) {
      if (error.response.data) {
        const { errors } = error.response.data;

        //If backend sends field errors than map over all error
        if (errors) {
          const newErrors = {};
          errors.forEach((err) => {
            newErrors[err.field] = err.message;
          });
          setErrors(newErrors);
        }
      } else {
        toast.error("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-white/90 rounded-xl shadow-md p-5 flex flex-col gap-4 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between font-[Geist]">
        <h2 className="text-[14px] xxs:text-[16px] sm:text-lg font-semibold text-gray-700">Add Funds</h2>
        <BadgeIndianRupee className="w-5 h-5 text-green-600" />
      </div>

      {/* Input */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none font-[Geist]"
      />
      {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}

      <input
        type="text"
        placeholder="Enter Pin"
        maxLength={4}
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none font-[Geist]"
      />
      {errors.pin && <p className="text-xs text-red-500">{errors.pin}</p>}

      {/* Button */}
      <button 
        onClick={addMoneyHandler}
        className="cursor-pointer font-[Geist] w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition"
      >
        {loading 
          ? (
            <div className="flex items-center justify-center gap-2">
              <Loader />
              <span>Processing...</span>
            </div>
          ) 
          : ("Add Funds")
        }
      </button>
    </div>
  );
};

export default AddFundsCard;
