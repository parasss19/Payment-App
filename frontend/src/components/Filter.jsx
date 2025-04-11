import { MyContext } from '@/context/MyContext';
import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcSearch } from "react-icons/fc";

const Filter = () => {
  const [query, setQuery] = useState("");

  const { setallusers, fetchUsers } = useContext(MyContext);

  const searching = async () => {
    //if query is empty then we show all users
    if(query.trim() === "") {
        return fetchUsers();
    }
    //if user type some query(filter) then only show filter value
    else {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/user/filterUser?filter=${query}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      setallusers(response.data.user);
      setQuery("");
    } 
  }


  return (
    <div className=" flex mt-10 mb-10 rounded-bl rounded-tl border border-l border-gray-300 lg:max-w-[90%] mx-auto">
        {/* Search Bar/Filter */}
        <input
          type='text'
          placeholder='Search User...'
          value={query}
          className='w-full py-3 pl-3 text-xl outline-none '
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Cross icon remove query */}
        {query && (
            <button className='mr-2 cursor-pointer opacity-50' onClick={() => setQuery("")}>
              <AiOutlineCloseCircle size={25} className="my-3"/>
            </button>
        )}

        {/* Search button */}
        <button onClick={searching} className=" bg-red-400 px-2 py-2 rounded-tr rounded-br cursor-pointer">
          <FcSearch size={35} className="-scale-x-100" />
        </button>
    </div>
  )
}

export default Filter