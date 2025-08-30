import { MyContext } from '@/context/MyContext';
import React, { useContext, useState } from 'react';
import { CheckCircle, Copy, Wallet } from "lucide-react";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const BalanceCard = () => {
  const { balance, userData } = useContext(MyContext);
  const firstName = userData?.firstName || "User";
  const lastName = userData?.lastName || "";
  const [isCopied, setIsCopied] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const copyHandler = () => {
    navigator.clipboard.writeText(userData.pin);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  } 

  return (
    <div className="">
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white rounded-xl shadow-md px-4 py-3 h-40 flex flex-col justify-between overflow-hidden">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div className="bg-yellow-400 w-8 h-6 rounded-sm"></div>
          <Wallet size={22} className="text-white" />
        </div>

        {/* Pin + copy btn */}
        <div className="text-xs font-mono flex items-center justify-between gap-2">
          <div className="flex gap-2 justify-between items-center text-md mt-1">
            <p className="opacity-70 text-[10px]">PIN </p>
            <p className="text-[11px] font-mono font-bold">
              {showPin ? userData?.pin.split("").join(" ") : "* * * *"}
            </p>
          </div>

          <div className='flex items-center justify-center gap-2'>
            {/* pin toggle icon */}
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="text-gray-500 hover:text-white"
            >
              {showPin ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>

            <button onClick={copyHandler} className="cursor-pointer">
              {isCopied ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500 hover:text-white" />
              )}
            </button>
          </div>
        </div>

        {/*balance*/}
        <div>
          <p className="text-xs opacity-80">Available Balance</p>
          <h2 className="text-lg font-bold font-[poppins]">
            ₹ {balance?.toLocaleString("en-IN") || 0}
          </h2>
        </div>

        {/*user full name */}
        <div className="flex items-center justify-between text-xs">
          <div className="uppercase font-semibold">
            {firstName} {lastName}
          </div>
          <div>
            <p className="opacity-70 text-[10px]">VALID THRU</p>
            <p className="text-[11px]">12/29</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
