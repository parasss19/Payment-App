import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'

import AppLayout from './layout/AppLayout';

import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';
import { ToastContainer } from "react-toastify";


function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,

      children: [
        {
          path: '/',
          element: <HomePage />
        }, 
        {
          path: '/signup',
          element: <Signup/>
        },
        {
          path: '/signin',
          element: <Signin/>
        },
        {
          path: '/dashboard',
          element: <Dashboard/>
        },
        {
          path: '/send/:recieverId',
          element: <SendMoney/>
        }
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
