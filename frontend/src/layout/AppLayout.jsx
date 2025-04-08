import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppLayout = () => {
  return (
    <div className='min-h-screen'>
        <div className='px-6 py-4'>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>

    </div>
  )
}

export default AppLayout