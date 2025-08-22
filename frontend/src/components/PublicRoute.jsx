import { MyContext } from '@/context/MyContext';
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
  const { isAuthenticated } = useContext(MyContext);
  
  //If user is logged in redirect to dashboard
  if(isAuthenticated){
    return <Navigate to="/dashboard" replace />;
  }
 
  //Otherwise show the public page (login/signup)
  return children;
}

export default PublicRoute