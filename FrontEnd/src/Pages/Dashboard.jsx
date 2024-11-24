import React,{useState} from 'react'
import { sessiondata } from '../Context/Context';
import {SideBar, NavBar} from '../Dashboard/SideBar';
//import AdminSummary from '../Dashboard/AdminSummary';
import { Outlet } from 'react-router-dom';
import { MultiLevelSidebar } from '../Dashboard/demotest';
 

const DashboardPage = () => {
    
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className='flex'>
        <SideBar  isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>  

        {/* <MultiLevelSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/> */}
        <div
        className={`flex-1 flex flex-col transition-all ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* <div className='flex-1 ml-20 bg-gray-300 h-screen'> */}
            <NavBar isCollapsed={isCollapsed}/>
            <div className='p-5'>
            <Outlet/>
              </div>
            {/* <AdminSummary /> */}
        </div>
       
    </div>
  )
}

export default DashboardPage


// import React, { useState } from "react";
// import {SideBar, NavBar} from '../Dashboard/SideBar';
// import { Outlet } from 'react-router-dom';


// const DashboardPage = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

//       {/* Main Content Area */}
//       <div
//         className={`flex-1 flex flex-col transition-all ${
//           isCollapsed ? "ml-20" : "ml-64"
//         }`}
//       >
//         {/* Navbar */}
//         <NavBar isCollapsed={isCollapsed} />

//         {/* Main Content with Outlet */}
//         <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100">
//           <div className="p-4 w-full max-w-5xl">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

