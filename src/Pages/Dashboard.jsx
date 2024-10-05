import React from 'react'
import { sessiondata } from '../Context/Context';
import {SideBar, NavBar} from '../Dashboard/SideBar';
import AdminSummary from '../Dashboard/AdminSummary';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
    const { user } = sessiondata();
  return (
    <div className='flex'>
        <SideBar/>  
        <div className='flex-1 ml-64 bg-gray-100 h-screen'>
            <NavBar/>
            <Outlet/>
            {/* <AdminSummary /> */}
        </div>
       
    </div>
  )
}

export default DashboardPage
