import { MyContext } from '@/context/MyContext';
import React, { useContext } from 'react'

const BalanceCard = () => {
  const {balance} = useContext(MyContext);
  return (
    <div className="flex text-2xl my-[4%] lg:max-w-[90%] mx-auto">
      <div className='bg-red-100 w-full sm:w-[50%] md:w-[40%] flex items-center justify-between px-3 py-3 rounded-lg overflow-hidden'>
        <h1 className='font-semibold font-[poppins] text-[20px] lg:text-[28px]'>Your Balance</h1>
        <span className='font-semibold font-[poppins] text-[20px] lg:text-[28px]'>Rs {balance}</span>
      </div>
    </div>
   
  )
}

export default BalanceCard