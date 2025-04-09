import React from 'react'
import BentoCards from '../components/BentoCards'

const HomePage = () => {
  return (
   <>
    <div className='mt-6 flex justify-center items-center'>
      <img src="PayEasy.png" alt="hero image" className='rounded-lg' />
    </div>
    <div className='mt-10  max-w-4xl mx-auto flex flex-col sm:text-center sm:max-w-2xl'>
        <h1 className="text-4xl font-[poppins] font-semibold mt-4 leading-snug sm:text-5xl">App to make payment easy</h1>
        <p className="font-[poppins] text-2xl mt-2 sm:mt-8">Now transfer money 💸 hassle free with <span className='text-red-600 font-mono font-bold'>PayEasy</span></p>
    </div>

    <div>
     <BentoCards/>
    </div>
   </>
  )
}

export default HomePage
