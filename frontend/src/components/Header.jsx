import { MyContext } from '@/context/MyContext';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button';


const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, firstName } = useContext(MyContext);

  return (
    <div className='"bg-white/95 "'>
      
      <nav className='py-2 flex justify-between items-center'>
        {/* Logo */}
        <Link to="/" className="flex justify-center items-center gap-2">
          <img src="/logo-modified.png" alt="logo" className="w-10 h-10 md:w-14 md:h-14" />
          <span className="font-bold font-[poppins] text-lg md:text-2xl"> PayEasy </span>
        </Link>

        {/* Buttons or Drop Down */}
        <div className="flex gap-2">
         {user ? (
          <div className='flex justify-center items-center gap-3'>
            <Button
              onClick = {() => navigate('/dashboard')}
              className="cursor-pointer font-[poppins] px-2 py-0 sm:px-3 sm:py-3 sm:text-xl font-semibold"
            >
              Dashboard
            </Button>


          </div>
         ) : (
          <>
            <Button onClick={() => navigate("/signin")} className="font-[poppins] sm:text-xl sm:p-5 text-center">Login </Button>
            <Button onClick={() => navigate("/signup")} className="font-[poppins] sm:text-xl sm:p-5 text-center" > Singup </Button>
          </>
         )}
        </div>
      </nav>

      
    </div>
  )
}

export default Header
