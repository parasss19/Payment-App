import { MyContext } from '@/context/MyContext';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from "./ui/dropdown-menu";
import { CircleUser, HomeIcon, LogOut } from 'lucide-react';
import { toast } from "react-toastify";

const Header = () => {
  const [showupdateinfo, setshowupdateinfo] = useState(false);    //used for showing update info modal
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

            <DropdownMenu>
              <DropdownMenuTrigger className='bg-gray-400 rounded-full px-3 py-1 sm:px-4 sm:py-2'>
                <span className='cursor-pointer sm:text-2xl font-[poppins] font-semibold'>
                  {firstName.charAt(0)}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent className='mr-3'>
                <DropdownMenuItem className="cursor-pointer">
                  <HomeIcon className="mr-2 h-4 w-4" />
                    <span onClick={() => navigate("/")}> Home </span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setshowupdateinfo(true)} className="cursor-pointer">
                  <CircleUser className="mr-2 h-4 w-4" />
                  <span > Update Info</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <Link
                    onClick={async () => {
                      localStorage.clear();
                      toast.success("Logged Out Successfully");
                      setUser(false);
                      navigate("/");
                    }}
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
