import { MyContext } from '@/context/MyContext';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const { allusers } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <div>
        {allusers && allusers.length > 0 ? (
          allusers.map((user) => (
            <div key={user._id} className='flex flex-col gap-6'>
                
                <div className="w-full lg:max-w-[90%] mx-auto py-3 p-3 relative flex items-center justify-between mb-10 rounded-lg border border-l border-gray-300" >
                    {/* user avatar and name */}
                    <div className="flex items-center gap-3">
                       <span className="w-8 h-8 flex items-center justify-center border bg-black rounded-full text-white font-[poppins] font-bold sm:text-xl" >{user.firstName.charAt(0)}</span>
                       <h1 className='font-[poppins] sm:text-2xl font-semibold'>{user.firstName}</h1>
                    </div>
                    {/* send money button */}
                    <button 
                      className="h-full cursor-pointer rounded sm:text-lg bg-gray-600 text-white py-1 px-2 sm:py-2 sm:px-4 hover:bg-gray-800 transition"
                      onClick={() => navigate(`/send/${user._id}`)}  //when we click on send money btn then we navigate to send page and we also send that user id(reciever id)
                    >
                      Send Money
                    </button>
                </div>

            </div>
          ))
        ) :
         <h1 className='font-[poppins] text-red-600 text-sm flex justify-center my-4'>No uesr found</h1>
        }
    </div>
  )
}

export default AllUsers