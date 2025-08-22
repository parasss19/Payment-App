import { MyContext } from '@/context/MyContext';
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const { isAuthenticated } = useContext(MyContext);
  
  //If user is logged in redirect to dashboard
  if(!isAuthenticated){
    return <Navigate to="/auth" replace />;
  }
 
  return children;
}

export default ProtectedRoute