import React, { useContext, useState } from 'react'
import { MyContext } from '@/context/MyContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';


const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  })

  const { fetchData, fetchUsers } = useContext(MyContext);
  const [errors, setErrors] = useState({});  //state for validation errors
  const navigate = useNavigate(); 

  //zod validation with error msg for each field 
  const signupValidation = z.object({
    username: z.string().email("Invalid email format"),
    lastName: z.string().min(1,"Last name is required"),
    firstName: z.string().min(1,"First name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

  //handle input change
  const handleInputChange = (e) => {
    const {name, value} = e.target;    //extract name = e.target.name and its value = e.target.value from input
    setFormData((prevState) => (
      {
        ...prevState,      //Preserve previous values(spread) prev state values so they dont affect and only value  that is changing will change
        [name] : value,    //if input is firstname then name is 'firstName' and value is 'e.target.value'
      }
    ))
  }

  //handle submit
  const handleSubmit = async () => {
    //validation check
    const result = signupValidation.safeParse(formData);

    //if validation fail
    if(!result.success){
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      return;
    }

    //if validation succeed then send post req for signup to backend server
    try {
      setErrors([]);
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/user/signup`, 
        JSON.stringify(formData),   //Ensure it's sent as JSON
        {
          headers: {"Content-Type": "application/json"}
        }
      )

      const token = response.data.token;

      if(token){
        localStorage.setItem('token', response.data.token);    //store jwt token in localstorage
        await fetchData();
        await fetchUsers();
        toast.success(response.data.msg)
        navigate("/dashboard");
      }else{
        toast(response.data.msg)
      }
    } 
    catch (error) {
      toast.error(error.response.data.error)
    }
  }


  return (
    <div className='mt-10 mb-20 sm:mx-8'>
      <div className='flex  justify-center gap-3 max-w-[90%] lg:max-w-[70%] mx-auto rounded-lg shadow-lg'>

        {/* left */}
        <div className='w-full lg:w-[45%] px-6 sm:px-10 py-10'>
          <h1 className="font-[poppins] text-4xl font-bold">Signup</h1>

          <div className='flex flex-col gap-4 mt-6'>
            <label className='flex flex-col gap-2 font-[poppins] text-xl font-medium'>
              First Name
              <input
                type='text'
                placeholder='John'
                className='border border-gray-300 py-3 px-3 rounded-lg font-normal'
                name='firstName'     //we have to pass name attributes so that our handleInputChange method work 
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.firstName[0]}</span>
              )}
            </label>

            <label className="flex flex-col gap-2 font-[poppins] text-xl font-medium">
              Last Name
              <input
                className="border border-gray-300 py-3 px-3 rounded-lg font-normal"
                type="text"
                name="lastName" 
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">{errors.lastName[0]}</span>
              )}
            </label>

            <label className="flex flex-col gap-2 font-[poppins] text-xl font-medium">
              Email
              <input
                className="border border-gray-300 py-3 px-3 rounded-lg font-normal"
                type="email"
                name="username" 
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
                name="password" 
                placeholder="*********"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password[0]}</span>
              )}
            </label>

            <Button onClick = {handleSubmit} className= 'cursor-pointer font-[poppins] sm:text-xl sm:p-5 text-center'>Signup</Button>
          </div>
        </div> 

        {/* right */}
        <div className='w-full lg:w-[55%] hidden lg:flex items-center'>
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

export default Signup