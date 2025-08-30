import { MyContext } from "@/context/MyContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";

import {
  ArrowLeftRight,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Wallet,
} from "lucide-react";
import UpdateInfo from './UpdateInfo';
import logo from "../assets/logo.webp";
import toast from "react-hot-toast";
import { MdUpdate } from "react-icons/md";
import axios from "axios";


const Header = () => {
  const { userData, setUserData, isAuthenticated, setIsAuthenticated, backendURL, setBalance} = useContext(MyContext);
  const navigate = useNavigate();
  
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);    //used for showing update info modal
  const [isOpen, setIsOpen] = useState(false);

  //used for closing usermenu when click outside
  const MenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (MenuRef.current && !MenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendURL}/api/v1/auth/logout`);
      
      if (data.success) {
        setIsAuthenticated(false);
        setUserData(null);
        setBalance(0);
        navigate("/");
        toast.success("Logged Out");
      }
    } 
    catch (error) {
      toast.error(error.message);
    }
  };

  const navLinks = [
    { name: "Add Funds", path: "/addFunds" },
    { name: "Transactions", path: "/transactions" },
    { name: "P2P Transfer", path: "/p2ptransfer" },
  ];

  return (
    <>
      {isAuthenticated ? (
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex justify-center items-center gap-2"
          >
            <img src={logo} alt="logo" className="w-8 h-8 md:w-12 md:h-12" />
            <span className="font-bold font-[poppins] text-lg md:text-2xl">
              PayEasy{" "}
            </span>
          </Link>

          {/* nav links */}
          <div className="hidden sm:flex gap-8 items-center font-[poppins]">
            {navLinks.map((link) => (
              <NavLink
                key={navLinks.path}
                to={link.path}
                className={({ isActive }) => `relative group text-gray-700 font-medium text-base transition-colors hover:text-gray-800 ${isActive ? "text-gray-900" : "" }` }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[1.5px] bg-gray-800 transition-all ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* User profile*/}
          <div
            ref={MenuRef}
            onClick={() => setIsOpen(!isOpen)}
            className="bg-black/85 text-white w-fit px-3 py-1 rounded-full flex justify-center items-center cursor-pointer"
          >
            {/* Avatar */}
            <span className="font-[Geist] font-bold text-center text-xl">
              {userData?.firstName.charAt(0)?.toUpperCase() ||
                userData?.username.charAt(0)?.toUpperCase()}
            </span>

            {/* Drop Down */}
            {isOpen && (
              <div className="absolute top-14 md:top-15 right-2 z-30 text-black font-[outfit]">
                <ul className="max-w-36 flex flex-col items-center list-none px-2 py-2 text-white backdrop-blur-sm bg-black/50 rounded">
                  {/* always visible in drop down*/}
                  <li
                    onClick={() => {
                      navigate("/dashboard");
                      setIsOpen(false);
                    }}
                    className="text-sm flex items-center gap-2 hover:bg-white/20 rounded px-2 py-2 w-full"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </li>

                  {/* Only visible in drop-down when screens size < 645px */}
                  <li
                    onClick={() => {
                      navigate("/addFunds");
                      setIsOpen(false);
                    }}
                    className="text-sm flex gap-2 hover:bg-white/20 rounded px-2 py-2 w-full sm:hidden"
                  >
                    <Wallet className="w-5 h-5" />
                    Add Funds
                  </li>

                  <li
                    onClick={() => {
                      navigate("/transactions");
                      setIsOpen(false);
                    }}
                    className="text-sm flex items-center gap-2 hover:bg-white/20 rounded px-2 py-2 w-full sm:hidden"
                  >
                    <IndianRupee className="w-5 h-5 shrink-0" />
                    Transactions
                  </li>

                  <li
                    onClick={() => {
                      navigate("/p2ptransfer");
                      setIsOpen(false);
                    }}
                    className="text-sm flex items-center gap-2 hover:bg-white/20 rounded px-2 py-2 w-full  sm:hidden"
                  >
                    <ArrowLeftRight className="w-5 h-5" />
                    P2P Transfer
                  </li>

                  {/* line */}
                  <div className="border my-1 w-full"></div>

                  {/* Always visible links in drop-down */}

                  {/* Update Dialog modal rendered */}
                  <li
                    onClick={() => {
                      setShowUpdateInfo(true);
                      setIsOpen(false);
                    }}
                    className="text-sm flex items-center gap-2 hover:bg-white/20 rounded px-2 py-2 w-full"
                  >
                    <MdUpdate className="w-6 h-6" />
                    Update Info
                  </li>

                  <li
                    onClick={logoutHandler}
                    className="text-sm flex items-center gap-2 hover:bg-white/20 rounded px-2 py-2 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex justify-center items-center gap-2">
            <img src={logo} alt="logo" className="w-8 h-8 md:w-12 md:h-12" />
            <span className="font-bold font-[poppins] text-lg md:text-2xl">
              {" "}
              PayEasy{" "}
            </span>
          </Link>

          {/* Button(Login/Signup) */}
          <div className="font-[Geist]">
            <button
              onClick={() => navigate("/auth")}
              className="cursor-pointer bg-cyan-800 hover:bg-cyan-700 text-white font-[Geist] font-semibold text-sm sm:text-lg px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md transition-transform duration-150 active:scale-95"
            >
              Signup
            </button>
          </div>
        </nav>
      )}

      {/* For opening updateinfo modal */}
      {showUpdateInfo && (
        <UpdateInfo showUpdateInfo={showUpdateInfo} setShowUpdateInfo={setShowUpdateInfo} />
      )}
      
    </>
  );
};

export default Header;
