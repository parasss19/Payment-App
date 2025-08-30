import { createContext, useEffect, useState } from "react";
import axios from 'axios';


export const MyContext = createContext();

const MyProvider = ({children}) => {
  axios.defaults.withCredentials = true;

  //backend url
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);   //track login state
  const [userData, setUserData] = useState(null);     //full user info from backend
  const [loading, setLoading] = useState(true);       //global loading state
  const [balance, setBalance] = useState(0);

  //P2P and wallet transactions state
  const [p2pTransactions, setP2pTransactions] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);


  //it provide use userInfo and user's authentication status
  const getAuthState = async () => {
      try {
        const {data} = await axios.get(`${backendURL}/api/v1/auth/isAuth`,{ withCredentials: true,}) 

        if(data.success){
          setUserData(data.user);   //my backend 'userAuth' middleware return 'user' obj which contain { _id, username, firstName, lastName, balance, pin ... }
          setIsAuthenticated(true);
        }
        else{
          setUserData(null);
          setIsAuthenticated(false);
        }
      } 
      catch (error) {
        setIsAuthenticated(false);
        setUserData(null);
        //console.log(error.message);
      } 
      finally{
        setLoading(false);
      }
  } 

  //fetch balance
  const fetchBalance = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/v1/account/balance`, { withCredentials:true })
      setBalance(response.data.balance);
    } 
    catch (error) {
      setBalance(0); //fallback
      //console.error("Error fetching data:", error.response?.data || error.message);
    }
  }

  //fetch p2ptransactions
  const fetchP2pTransactions = async() => {
    try {
      const {data} = await axios.get(`${backendURL}/api/v1/account/p2pTransactions`, { withCredentials:true });
      if(data.success){
        setP2pTransactions(data.transactions);
      }else {
        //console.warn("Failed to fetch P2P transactions:", data.message);
        setP2pTransactions([]);
      }
    } 
    catch (error) {
      setP2pTransactions([]);
      //console.error("Error fetching P2P transactions:", error.response?.data || error.message);
    }
  }

  //fetch walletTransactions
  const fetchWalletTransactions = async() => {
    try {
      const {data} = await axios.get(`${backendURL}/api/v1/account/walletTransactions`, {withCredentials: true} );
      if(data.success){
        setWalletTransactions(data.transactions);
      } 
      else {
        //console.warn("Failed to fetch wallet transactions:", data.message);
        setWalletTransactions([]);
      }
    } catch (error) {
        //console.error("Error fetching wallet transactions:", error.response?.data || error.message);
        setWalletTransactions([]);
    }
  }

  
  useEffect(() => {
    getAuthState();
    fetchBalance();
    fetchP2pTransactions();
    fetchWalletTransactions();
  }, []);

  //Whenever user changes, reset old state
  useEffect(() => {
    //logout or unauthenticated
    if (!userData) {
      setBalance(0);
      setP2pTransactions([]);
      setWalletTransactions([]);
    } 
    //authenticated → fetch fresh data
    else {
      fetchBalance();
      fetchP2pTransactions();
      fetchWalletTransactions();
    }
  }, [userData]);


  return(
    <MyContext.Provider value = {{
      backendURL, 
      loading, 

      //Authentication
      isAuthenticated, setIsAuthenticated, 
      userData, setUserData,
      getAuthState,
      
      //Balance
      balance, setBalance, 
      fetchBalance, 

      //transactions
      walletTransactions,
      fetchWalletTransactions,
      
      p2pTransactions,
      fetchP2pTransactions
    }}>
      {children}
    </MyContext.Provider>
  )
}

export default MyProvider 
