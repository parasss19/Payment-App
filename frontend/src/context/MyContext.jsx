import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const MyContext = createContext();

const MyProvider = ({children}) => {
  const [user, setUser] = useState(false);
  const [balance, setBalance] = useState(0);
  const [firstName, setfirstName] = useState("");
  const [receiverId, setreceiverId] = useState(""); 
  const [receiverName, setreceiverName] = useState("");
  const [allusers,setallusers] = useState()   //fetch all users to show on dashboard insitally

  //fetch balance and user detials from server
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        return console.log("No token found")
      }
      const response = await axios.get('http://localhost:3000/api/v1/account/balance',{
        headers: {
          Authorization: `Bearer ${token}`    //send token while requesting for balance and user details from server
        }
      })
      console.log(response);
      setBalance(response.data.balance);
      setfirstName(response.data.firstName);
      setUser(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //Fetch all users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        return console.log("No token found")
      }
      const response = await axios.get('http://localhost:3000/api/v1/user/filterUser',{
        headers: {
          Authorization: `Bearer ${token}`    //send token while requesting for balance from server
        }
      })
      //console.log(response);
      setallusers(response.data.allusers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }


  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
    fetchUsers();
   }, []);

  return(
    <MyContext.Provider value = {{
      user, setUser, firstName, setfirstName, balance, setBalance, receiverId, setreceiverId, receiverName, setreceiverName,
      allusers, setallusers, fetchData, fetchUsers
    }}>
      {children}
    </MyContext.Provider>
  )
}

export default MyProvider 