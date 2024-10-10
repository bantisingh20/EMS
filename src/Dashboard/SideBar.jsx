import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaBuilding, FaCalendar, FaCalendarAlt, FaMoneyBill, FaSteam, FaTachometerAlt, FaUsers} from 'react-icons/fa'
import { sessiondata } from '../Context/Context';
 
const SideBar = () => {
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


            <NavLink to="salary" className= {({isActive}) => `${isActive ? "bg-teal-500" :" "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
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


const NavBar = () => {
    const {user, logout} = sessiondata();
    return(
        <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
            <p >Welcome {user.name}</p>
            <button type="button" className='px-4 py-1 bg-teal-700 hover:bg-teal-900' >Logout</button>
             
        </div>
    )
}
export {NavBar, SideBar}
