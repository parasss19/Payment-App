import React from 'react'
import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='lg:max-w-[90%] mx-auto flex flex-col gap-4 min-[700px]:flex-row  items-center justify-between px-3 py-5 bg-gray-50 border border-gray-300 rounded-lg'>

    <div className='flex items-center gap-2'>
      <img src="logo-modified.png" alt="logo" className='w-10 h-10 md:w-14 md:h-14' h-8 />
      <p className='font-[poppins] text-lg sm:text-xl font-semibold'>PayEasy</p>
    </div>

    <div className='flex items-center gap-3'>
      <a href="https://twitter.com/Parasss1902" target='blank'><FaSquareXTwitter size={30} className='w-5 h-5 hover:-translate-y-1 transition-transform ease-linear'/></a>
      <a href="https://github.com/parasss19" target='blank'><FaGithub size={30} className='w-5 h-5 hover:-translate-y-1 transition-transform ease-linear'/></a>
      <a href="https://www.linkedin.com/in/paras-mehta19/" target='blank'><FaLinkedin size={30} className='w-9 h-5 hover:-translate-y-1 transition-transform ease-linear'/></a>
    </div>

    <p class="text-sm text-gray-500">© 2025 PayEasy, Inc. All rights reserved.</p>
   </div>
  )
}

export default Footer