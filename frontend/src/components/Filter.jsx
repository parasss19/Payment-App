import { MyContext } from '@/context/MyContext';
import axios from 'axios';
import { SearchCheck, User2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Filter = () => {
  const { backendURL , userData} = useContext(MyContext);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [allusers,setallusers] = useState([])

  const [showAll, setShowAll] = useState(false);
  const [copiedUserId, setCopiedUserId] = useState(false);


  //Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/v1/user/filterUser`,{ withCredentials: true })
      setallusers(response.data.users);
    } 
    catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // Filter users with debouncing
  const fetchFilteredUsersWithDebounce = async (query) => {
    try {
      const response = await axios.get(`${backendURL}/api/v1/user/filterUser?filter=${query}`,{ withCredentials: true });
      setallusers(response.data.users);
    } 
    catch (error) {
      console.error("Error fetching filtered users:", error);
    }
  };

  //Re-fetch on query change with 'debounce' - as soon as i type, the component will fetch filtered users (with a small delay to avoid spamming the backend)
  useEffect(() => {
    const delay = setTimeout(() => {
      if(query.trim() === "") {
        fetchUsers();
      } 
      else {
        fetchFilteredUsersWithDebounce(query);
      }
    }, 400); //400ms debounce delay

    return () => clearTimeout(delay); //cleanup on new keystroke
  }, [query]);
  

  //load all users when component mount
  useEffect(() => {
    fetchUsers()
  },[])

  const copyHandler = (recieverId) => {
    navigator.clipboard.writeText(recieverId);
    setCopiedUserId(recieverId);
    setTimeout(() => setCopiedUserId(null), 1500);
  }


  return (
    <div className="w-full lg:max-w-3xl mx-auto ">
      <div className="bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4 font-[Geist] pr-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <User2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-[14px] xxs:text-[16px] sm:text-lg break-words font-semibold text-gray-800">
              {" "}
              Search User{" "}
            </h2>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-medium text-indigo-600 hover:underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>

        {/* Search bar */}
        <div className="flex items-center bg-white border rounded-lg shadow-sm overflow-hidden mb-4">
          <input
            type="text"
            placeholder="Search user..."
            value={query}
            className="w-full py-2 sm:py-3 px-4 text-[14px] sm:text-base outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Clear query */}
          {query && (
            <button
              className="px-2 text-gray-500 hover:text-gray-700"
              onClick={() => setQuery("")}
            >
              <AiOutlineCloseCircle size={22} />
            </button>
          )}

          {/* Search icon */}
          <button className="bg-cyan-400 px-4 py-3 flex items-center justify-center">
            <SearchCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Users */}
        <ul
          className={`space-y-3 font-[Geist] transition-all duration-300 ${
            showAll ? "max-h-[330px] overflow-y-auto pr-1" : ""
          }`}
        >
          {allusers && allusers.length > 0 ? (
            (query.trim() !== ""
              ? allusers //show filter user when query is not empty
              : showAll
              ? allusers //show all
              : allusers.slice(0, 4)
            ) //only first 4 initially
              .map((user) => (
                <li
                  key={user._id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/60 px-4 py-3 hover:bg-gray-100 transition"
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 xxs:w-10 xxs:h-10 flex items-center justify-center bg-gray-800 text-white rounded-full font-semibold text-sm xxs:text-lg">
                      {user.firstName.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <h1 className="font-semibold text-gray-900 text-sm xxs:text-lg">
                        {user.firstName} {user.lastName}
                      </h1>
                      <p className="text-gray-500 text-sm">{user.username}</p>
                    </div>
                  </div>

                  {/* Copy user id Btn */}
                  <button
                    onClick={() => copyHandler(user._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-sm text-xs sm:text-base font-medium transition cursor-pointer"
                  >
                    {copiedUserId === user._id ? (
                      <span className="text-white">Copied</span>
                    ) : (
                      <span className="text-white">Copy-ID</span>
                    )}
                  </button>
                </li>
              ))
          ) : (
            <h1 className="text-red-600 text-center mt-6 font-medium">
              No user found
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Filter