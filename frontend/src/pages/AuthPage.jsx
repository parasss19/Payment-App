import { MyContext } from "@/context/MyContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline, IoPersonCircleOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import AuthFormImg from '../assets/AuthFormImg.webp'
import {z} from 'zod'


const AuthPage = () => {
  const navigate = useNavigate();
  const {backendURL, setIsAuthenticated, getAuthState, fetchBalance} = useContext(MyContext);
  
  const [state, setState] = useState("Sign Up");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target; //extract name = e.target.name and its value = e.target.value from input
    setFormData((prevState) => ({
      ...prevState, //Preserve previous state values(spread) so they dont affect and only value  that is changing will change
      [name]: value, //if input is firstname then name is 'firstName' and value is 'e.target.value'
    }));
  };

  // Zod schemas
  const signUpSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    username: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const signInSchema = z.object({
    username: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //validate form data before sending data to backend
    const result = state == "Sign Up" 
      ? signUpSchema.safeParse(formData) 
      : signInSchema.safeParse(formData);
    
    if(!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
 
    try {
      axios.defaults.withCredentials = true; //it is used to send cookies with our request
      setButtonLoading(true);

      const endpoint = state === "Sign Up"
        ? `${backendURL}/api/v1/auth/signup`
        : `${backendURL}/api/v1/auth/signin`

      const payload = state === "Sign Up"
        ? formData
        : { username: formData.username, password: formData.password };
      
      //api call     
      await axios.post(endpoint, payload);

      if(state === "Sign Up") {
        setIsAuthenticated(true);
        await fetchBalance();
        await getAuthState();
        
        toast.success("Welcome 🎉");
        navigate("/dashboard");
      } 
      else {
        setIsAuthenticated(true);
        await fetchBalance();
        await getAuthState();
        toast.success("Welcome Back🎉");
        navigate("/dashboard");
      }
    } 
    catch (error) {
      if(error.errors) {
        toast.error(error.errors[0].message);  //Zod validation errors
      }
      else {
        toast.error(error.response?.data?.message || `${state} failed`);
      };
    } 
    finally {
      setButtonLoading(false);
    }
  };


  //Toggle between signup/signin state and clear form data and errors msg when toggling
  const toggleState = () => {
    setState((prev) => (
      prev === "Sign Up" ? "Login" : "Sign Up"
    ));
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
    setErrors({});
  };



  return (
    <div className="mt-5 sm:mt-8 w-full flex justify-center px-3 sm:px-4">
      <div className="flex flex-col sm:flex-row rounded-xl shadow-md overflow-hidden max-w-3xl w-full">
        {/* Left- form */}
        <div className="w-full sm:w-1/2 px-5 sm:px-6 py-8 sm:py-10">
          <h2 className="font-[Geist] text-xl sm:text-2xl font-bold text-center sm:text-left">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
            {/* firstname and lastname is for Sign Up only */}
            {state === "Sign Up" && (
              <>
                <div className="font-[poppins] flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-blue-600/15">
                  <IoPersonCircleOutline className="shrink-0 w-5 h-5" />
                  <input
                    className="w-full outline-none bg-transparent font-[outfit] text-sm sm:text-base"
                    name="firstName"
                    type="text"
                    placeholder="Firstname"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />

                </div>
                {errors.firstName && (
                  <p className="text-sm text-red-500"> {errors.firstName[0]}</p>
                )}

                <div className="font-[poppins] flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-blue-600/15">
                  <IoPersonCircleOutline className="shrink-0 w-5 h-5" />
                  <input
                    className="w-full outline-none bg-transparent font-[outfit] text-sm sm:text-base"
                    name="lastName"
                    type="text"
                    placeholder="Lastname"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-red-500"> {errors.lastName[0]} </p>
                )}
              </>
            )}

            {/* Email */}
            <div className="font-[poppins] flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-blue-600/15">
              <MdEmail className="shrink-0 w-5 h-5" />
              <input
                className="w-full outline-none bg-transparent font-[outfit] text-sm sm:text-base"
                name="username"
                type="email"
                placeholder="Email"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500"> {errors.username[0]} </p>
              )}

            {/* Password */}
            <div className="font-[poppins] flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-blue-600/15">
              <RiLockPasswordFill className="shrink-0 w-5 h-5" />
              <input
                className="w-full outline-none bg-transparent font-[outfit] text-sm sm:text-base"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              {/* password toggle icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOutline className="w-5 h-5" />
                )}
              </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500"> {errors.password[0]}</p>
              )}

            {/* Submit */}
            <button
              type="submit"
              className={`flex gap-2 justify-center items-center w-full cursor-pointer rounded-lg mt-4
                ${buttonLoading ? "bg-black/40" : "bg-black/80"} 
                text-white font-medium py-2 text-sm sm:text-base transition-colors
              `}
            >
              {buttonLoading ? (
                <>
                  <span>{state}</span>
                  <Loader />
                </>
              ) : (
                state
              )}
            </button>
          </form>

          {/* Redirect */}
          <p className="text-gray-500 text-center text-xs sm:text-sm mt-4">
            {state === "Sign Up" 
              ? "Already have an account?" 
              : "Don't have an account?" 
            }{" "}
            <button
              type="button"
              onClick={toggleState}
              className="underline text-blue-400 cursor-pointer"
            >
              {state === "Sign Up" ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Right - image*/}
        <div className="hidden sm:flex w-full sm:w-1/2 bg-gray-100 items-center justify-center">
          <img
            src={AuthFormImg}
            alt="auth form image"
            className="w-auto h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
