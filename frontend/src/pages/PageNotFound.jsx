import { Link, useNavigate } from 'react-router-dom';
import { Ban } from 'lucide-react'; // Optional icon
import { useContext } from 'react';
import { MyContext } from '../context/MyContext.jsx';

const PageNotFound = () => {
  const {user} = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <div className="my-20 flex flex-col items-center justify-center text-center px-4">
      
      <Ban className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      
      {user
      ? (
        <div className='flex justify-center items-center gap-5'>
          <button
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white font-[Geist] font-semibold text-sm sm:text-lg px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md transition-transform duration-150 active:scale-95"
          >
            Go To Ḍashboard
          </button>
        </div>
        )
      
      : (
        <div className='flex justify-center items-center gap-5'>
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white font-[Geist] font-semibold text-sm sm:text-lg px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md transition-transform duration-150 active:scale-95"
          >
            Home
          </button>
        </div>
        )
      }
    </div>
  );
};

export default PageNotFound;
