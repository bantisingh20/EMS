import React, { useEffect } from 'react'
import { NavLink ,Link } from 'react-router-dom'
import {FaBuilding, FaRedoAlt, FaCalendarAlt, FaMoneyBill, FaSteam, FaTachometerAlt, FaUsers, FaKey} from 'react-icons/fa'
import { sessiondata } from '../Context/Context';
import { FaUser,FaLock } from 'react-icons/fa';

const SideBarOld = () => {
    //console.clear();
  return (
    <div className="bg bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
        <div className='bg-teal-600 h-12 items-cente justify-center'>
            <h2 className='text-2xl text-center font-pacific'>Employee</h2>
        </div>

        <div className='px-4'>
            <NavLink to="/dashboard"
             className= {({isActive}) => `${isActive ? "bg-teal-500" :" "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
                <FaTachometerAlt /> <span>Dashboard</span>
            </NavLink>
            <NavLink to="employees" 
             className= {({isActive}) => `${isActive ? "bg-teal-500" :" "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                <FaUsers /> <span>Employees</span>
            </NavLink>
            <NavLink to="department" 
            className= {({isActive}) => `${isActive ? "bg-teal-500" :" "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                <FaBuilding /> <span>Department</span>
            </NavLink>

            <NavLink to="designation" 
            className= {({isActive}) => `${isActive ? "bg-teal-500" :" "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                <FaBuilding /> <span>Designation</span>
            </NavLink>


            <NavLink to="salary" className= {({isActive}) => `${isActive ? "bg-teal-500" :" "} flex items-center space-x-4 block py-2.5 px-4 rounded `}>
                <FaMoneyBill /> <span>Salary</span>
            </NavLink>
            <NavLink to="leave" className= {({isActive}) => `${isActive ? "bg-teal-500" :" "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                <FaCalendarAlt /> <span>Leave</span>
            </NavLink>
            <NavLink to="setting" className= {({isActive}) => `${isActive ? "bg-teal-500" :" "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                <FaSteam /> <span>Setting</span>
            </NavLink>
        </div>
    </div>
       
  )
}

const SideBar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div
      className={`bg-gray-800 text-white h-screen fixed top-0 bottom-0 transition-all ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header Section */}
      <div className="bg-teal-600 h-12 flex items-center justify-between px-4">
        {!isCollapsed && <h2 className="text-2xl font-pacific">Employee</h2>}
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="px-2 py-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt className="text-lg" />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="employees"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaUsers className="text-lg" />
          {!isCollapsed && <span>Employees</span>}
        </NavLink>

        <NavLink
          to="department"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaBuilding className="text-lg" />
          {!isCollapsed && <span>Department</span>}
        </NavLink>

        <NavLink
          to="designation"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaBuilding className="text-lg" />
          {!isCollapsed && <span>Designation</span>}
        </NavLink>

        {/* <NavLink
          to="salarynew"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded `
          }
        >
          <FaMoneyBill className="text-lg" />
          {!isCollapsed && <span>Salary</span>}
        </NavLink> */}

        <NavLink
          to="leave"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt className="text-lg" />
          {!isCollapsed && <span>Leave</span>}
        </NavLink>

        <NavLink
          to="setting"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaSteam className="text-lg" />
          {!isCollapsed && <span>Setting</span>}
        </NavLink>
      </div>
    </div>
  );
};

const NavBar = ({isCollapsed}) => {
    const {user, logout} = sessiondata();
       
    const handleProfileClick = () => {
        
    };
 
    return(
        <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
            <p >Welcome {user.name !="" ? user.name : "Guest"}</p>
            
            <div className="flex items-center gap-4">
                            
                <button
                    type="button"
                    className="px-4 py-1  hover:bg-teal-000"
                    
                >
                    <FaLock size={24} /> 
                </button>

                <button onClick={handleProfileClick} className="px-4 py-1 text-white">
                    <FaUser size={24} />  
                </button>

                <Link to="/dashboard/change-password" className="px-4 py-1 text-white" aria-label="Change Password">
                    <FaKey size={24} /> 
                </Link>
            </div>
        </div>
    )
}
export {NavBar, SideBar}



// latest ncage
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaBuilding, FaCalendarAlt, FaMoneyBill, FaSteam, FaTachometerAlt, FaUsers } from "react-icons/fa";
// import { sessiondata } from "../Context/Context";




// const NavBar = ({ isCollapsed }) => {
//   const { user, logout } = sessiondata();

//   return (
//     <div
//       className={`flex items-center text-white justify-between h-12 bg-teal-600 px-5 fixed top-0 left-0 right-0 transition-all ${
//         isCollapsed ? "ml-20" : "ml-64"
//       }`}
//     >
//       <p>Welcome {user.name}</p>
//       <button
//         type="button"
//         onClick={logout}
//         className="px-4 py-1 bg-teal-700 hover:bg-teal-900"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export { SideBar ,NavBar };

