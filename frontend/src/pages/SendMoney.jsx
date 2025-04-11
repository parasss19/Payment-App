import { MyContext } from '@/context/MyContext';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";

const SendMoney = () => {
  const [amount, setamount] = useState("");
  const { receiverName, setreceiverName, fetchData } = useContext(MyContext);
  const navigate = useNavigate();

   
  const {recieverId} = useParams();   //here we extract the 'reciever' id we send on the allusers page when we click on 'send money btn'

    //this will fetch reciever details when our component mount
    useEffect(() => {
      const fetchReceiverDetails = async () => {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/account/receiverdetails/${recieverId}` , {
          headers: {
            Authorization : `Bearer ${token}`
          }
        })
        setreceiverName(response.data.name);
      }
      fetchReceiverDetails();
    }, [])


    //this will run when we click transfer btn
    const handleTransfer = async () => {
      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
    
      try {
        const token = localStorage.getItem('token');  
        const response = await axios.patch(`${import.meta.env.VITE_URL}/api/v1/account/transfer` ,
          {
            recieverId,
            amount
          },
          {
            headers: {
              Authorization : `Bearer ${token}`
            }
          }
        )
        toast.success(response.data.msg);
        fetchData(); 
        navigate('/dashboard')
      } 
      catch (error) {
        toast.error(response.data.msg);
      }
    }


  return (
    <>
    <div className="my-10 flex justify-center items-center mx-auto h-[69vh]">
        
        <div className="py-8 flex flex-col justify-center mx-auto min-w-[84vw] sm:min-w-[70vw] md:min-w-[60vw] lg:min-w-[46vw] rounded-xl shadow-2xl">
          <h1 className="flex justify-center mb-10 font-[poppins] font-bold text-[22px] sm:text-3xl lg:text-4xl">Send Money</h1>

          <div className="px-6 mb-3 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="bg-gray-400 rounded-full px-3 py-1 font-[poppins] font-semibold"> {receiverName.charAt(0)} </span>
              <h1 className="font-[poppins] font-bold text-[17px] sm:text-[20px] md:text-[24px] ">{receiverName}</h1>
            </div>
            <span className="font-sans font-light">Amount (in Rs)</span>
          </div>

         <div className="px-6 flex flex-col gap-3">
          <input 
            className="w-full py-2 sm:py-3 pl-3 text-xl outline-none rounded border border-gray-300 "
            type="number" 
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
          />
          <button onClick={handleTransfer} className="bg-green-300 py-2 sm:py-3 font-[poppins] font-semibold text-lg md:text-xl ">Initiate Transfer</button>
         </div>
        </div>
        
      </div>

    </>
  )
}

export default SendMoney