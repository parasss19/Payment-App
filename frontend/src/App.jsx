import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'

import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';
import { Toaster } from 'react-hot-toast';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AuthPage from './pages/AuthPage';
import P2PTransfer from './pages/P2PTransfer';
import AddFunds from './pages/AddFunds';
import Transactions from './pages/Transactions';


function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,

      children: [
        //Public Routes
        {
          path: '/',
          element:(
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          )
        }, 
        {
          path: '/auth',
          element:(
            <PublicRoute>
              <AuthPage/>
            </PublicRoute>
          ) 
        },

        //Protected Routes
        {
          path: '/dashboard',
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )
        },
        {
          path: '/addFunds',
          element: (
            <ProtectedRoute>
              <AddFunds />
            </ProtectedRoute>
          )
        },
        {
          path: '/transactions',
          element: (
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          )
        },
        {
          path: '/p2ptransfer',
          element: (
            <ProtectedRoute>
              <P2PTransfer />
            </ProtectedRoute>
          )
        },
        {
          path: '/send/:recieverId',
          element: (
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          )
        },

        //Terms and policy routes
        {
          path: '/privacy',
          element: (
            <PrivacyPolicy/>
          )
        },
        {
          path: '/terms',
          element: (
            <Terms/>
          )
        },

        //Catch-all route for 404 
        {
          path: '*',
          element: <PageNotFound/>,
        },
        
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
