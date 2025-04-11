import { Button } from '@/components/ui/button';
import { MyContext } from '@/context/MyContext';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signin = () => {
  const [formData , setFormData] = useState({
    username:"",
    password:""
  })
 
  const { fetchData, fetchUsers } = useContext(MyContext);
 
  const [errors, setErrors] = useState({});
    
  const navigate = useNavigate();  
  
  //zod validation with error msg for each field 
  const signinValidation = z.object({
    username: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  
  //handle input change
  const handleInputChange = (e) => {
    const {name , value} = e.target;
    setFormData((prevState) =>(
      {
        ...prevState,
        [name] : value,
      }
    ))
  }
  
    //handle submit 
    const handleSubmit = async () =>{
      const result = signinValidation.safeParse(formData);
      
      //if validation failed
      if(!result.success){
        const formattedErrors = result.error.flatten().fieldErrors;
        setErrors(formattedErrors);
        return;
      }
  
      //if validation succeed then send post req for login to backend server \
      try {
        setErrors({});
        const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/user/signin`,
          JSON.stringify(formData),
          {
            headers: {"Content-Type" : "application/json"} 
          }
        )
  
        //if token exist then put token in localstorage and navigate to dashboard
        const token = response.data.token;
        if(token){
          localStorage.setItem('token', response.data.token);
          await fetchData();
          await fetchUsers();
          toast.success(response.data.msg)
          navigate('/dashboard');
        } 
        else {
          toast(response.data.msg)
      }
    }
    catch (error) {
      toast.error(error.response.data.error || error.response.data.msg);
    }
  }  


  return (
    <div className='className="mt-10 mb-20 sm:mx-8"'>
      <div className="flex  justify-center gap-3 max-w-[90%] lg:max-w-[70%] mx-auto rounded-lg shadow-lg">
        
        {/* left */}
        <div className="w-full lg:w-[45%] px-6 sm:px-10 py-10">
          <h1 className="font-[poppins] text-4xl font-bold">Login</h1>

          <div className="flex flex-col gap-4 mt-6">
            <label className="flex flex-col gap-2 font-[poppins] text-xl font-medium">
              Email
              <input
                className="border border-gray-300 py-3 px-3 rounded-lg font-normal"
                type="email"
                name='username'
                placeholder="johnDoe@gmail.com"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username[0]}</span>
              )}
            </label>

            <label className="flex flex-col gap-2 font-[poppins] text-xl font-medium">
              Password
              <input
                className="border border-gray-300 py-3 px-3 rounded-lg font-normal"
                type="number"
                name='password'
                placeholder="*********"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password[0]}</span>
              )}
            </label>

            <Button onClick = {handleSubmit} className= 'font-[poppins] sm:text-xl sm:p-5 text-center'>Login</Button>
          </div>
        </div>

        {/* right */}
        <div className="w-full lg:w-[55%] hidden lg:flex items-center">
          <img
            src="/fintech.png"
            alt="Signup page illustration"
            className="w-auto h-full object-cover rounded-r-lg"
          />
        </div>

      </div>
    </div>
  )
}

export default Signin