// import React,{useState} from 'react'
// import { sessiondata } from '../Context/Context';
// import {SideBar, NavBar} from '../Dashboard/SideBar'; 
// import { Outlet } from 'react-router-dom';
// import { MultiLevelSidebar } from '../Dashboard/demotest';
 

// const DashboardPage = () => {
    
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };
//   return (
//     <div className='flex'>
//         <SideBar  isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>  

//         {/* <MultiLevelSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/> */}
//         <div
//         className={`flex-1 flex flex-col transition-all ${
//           isCollapsed ? "ml-20" : "ml-64"
//         }`}
//       >
//         {/* <div className='flex-1 ml-20 bg-gray-300 h-screen'> */}
//             <NavBar isCollapsed={isCollapsed}/>
//             <div className='p-5'>
//               <Outlet/>
//             </div>
//             {/* <AdminSummary /> */}
//         </div>
       
//     </div>
//   )
// }

// export default DashboardPage

import React, { useState } from 'react';
import { SideBar, NavBar } from '../LayOut/SideBar'; 
import { Outlet } from 'react-router-dom'; 

const DashboardPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className='flex'>
      <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all ${isCollapsed ? "ml-20" : "ml-64"}`}
        style={{ position: 'relative', overflow: 'hidden' }} // Ensure no overflow issues
      >
        <NavBar isCollapsed={isCollapsed} />

        {/* Content wrapper with scroll */}
        <div className='p-5' style={{ overflowY: 'auto', height: 'calc(100vh - 60px)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


