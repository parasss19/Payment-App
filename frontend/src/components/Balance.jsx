import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle, Copy, IndianRupeeIcon, Wallet } from "lucide-react";
import { MyContext } from "@/context/MyContext";
import { useContext, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";


const Balance = () => {
  const { userData, balance } = useContext(MyContext);
  const [isCopied, setIsCopied] = useState(false);
  const [showPin, setShowPin] = useState(false);
  
  const copyHandler = () => {
    navigator.clipboard.writeText(userData.pin);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  } 

  return (
    <Card className="rounded-2xl shadow-sm border border-gray-200 bg-white/90">
      <CardHeader className="flex flex-row items-center justify-between ">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
            <Wallet className="w-4 h-4" />
          </div>
          <CardTitle className="text-lg font-semibold text-gray-800 font-[Geist]">
            {" "}
            Balance
          </CardTitle>
        </div>
        <span className="text-xs font-medium text-gray-500 font-[Geist]">
          Available
        </span>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
          <IndianRupeeIcon className="w-5 h-5 text-green-600" />
          <span className="font-[Geist]">{balance.toLocaleString()}</span>
        </div>

        <p className="font-[Geist] mt-1 text-[10px] text-gray-400"> Updated in real-time</p>

        <div className="text-xs flex items-center justify-between gap-2 mt-3">
          <div className="flex gap-2 justify-between items-center text-md mt-1">
            <p className="opacity-70 text-[15px] font-[Geist]">PIN </p>
            <p className="text-[15px] font-[Geist] font-bold">
              {showPin ? userData?.pin.split("").join(" ") : "* * * *"}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            {/* pin toggle icon */}
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="text-gray-500 hover:text-gray-800"
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
                <Copy className="w-4 h-4 text-gray-500 hover:gray-800" />
              )}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Balance;
