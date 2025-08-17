import { Link } from 'react-router-dom';
import { Ban } from 'lucide-react'; // Optional icon
import { useContext } from 'react';
import { MyContext } from '../context/MyContext.jsx';

const PageNotFound = () => {
  const {user} = useContext(MyContext);

  return (
    <div className="my-20 flex flex-col items-center justify-center text-center px-4">
      
      <Ban className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      
      {user
      ? (
          <div className='flex justify-center items-center gap-5'>
            <Link to="/dashboard">
              <button className='border px-3 py-1 text-lg bg-black text-white font-semibold font-[outfit] rounded-lg cursor-pointer'>Go to Dashboard</button>
            </Link>
          </div>
        )
       
      : (
          <div className='flex justify-center items-center gap-5'>
            <Link to="/">
              <button className='border px-3 py-1 text-lg bg-black text-white font-semibold font-[outfit] rounded-lg cursor-pointer'>Home</button>
            </Link>
            <Link to="/auth">
              <button className='border px-3 py-1 text-lg bg-black text-white font-semibold font-[outfit] rounded-lg cursor-pointer'>Signup</button>
            </Link>
          </div>
        )
      }
    </div>
  );
};

export default PageNotFound;
