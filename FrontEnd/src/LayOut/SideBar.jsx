import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaUsers, FaKey, FaTachometerAlt, FaSteam, FaLock, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { sessiondata } from '../Context/Context';
import { GetAllMenulist } from '../api/MenuApi';

const SideBar = ({ isCollapsed, toggleSidebar }) => {
  const [menulist, setMenulist] = useState([]);
  
  const navLinks = [
    { to: '/dashboard', icon: <FaTachometerAlt className="text-lg" />, label: 'Dashboard' },
    { to: 'list-employees', icon: <FaUsers className="text-lg" />, label: 'Employees' },
    { to: 'list-department', icon: <FaBuilding className="text-lg" />, label: 'Department' },
    { to: 'list-designation', icon: <FaBuilding className="text-lg" />, label: 'Designation' },
    { to: 'leave/leavedashboard', icon: <FaCalendarAlt className="text-lg" />, label: 'Leave' },
    { to: 'attendence', icon: <FaCalendarAlt className="text-lg" />, label: 'Attendence' },
    { to: 'setting', icon: <FaSteam className="text-lg" />, label: 'Setting' },
    { to: 'Report', icon: <FaCalendarAlt className="text-lg" />, label: 'Report' },
  ];

  const fetchMenuData = async () => {
    try {
      const data = await GetAllMenulist();
      setMenulist(data.data);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <div
      className={`bg-gray-800 text-white h-screen fixed top-0 bottom-0 transition-all ${
        isCollapsed ? "w-20" : "w-64"
      } md:w-64`}
    >
      {/* Header Section */}
      <div className="bg-teal-600 h-12 flex items-center justify-between px-4">
        <div className="flex items-center">
          {/* Logo/Brand */}
          {!isCollapsed && <h2 className="text-2xl font-pacific">EMS</h2>}
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none md:hidden"
        >
          {/* Hamburger icon for mobile */}
          {isCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="px-2 py-3">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
            end
          >
            {link.icon}
            {!isCollapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const NavBar = ({ isCollapsed }) => {
  const { user, logout } = sessiondata();

  const handleProfileClick = () => {
    // Profile logic
  };

  return (
    <div className="flex items-center justify-between h-12 bg-teal-600 px-5 md:w-full">
      <p>Welcome {user ? ` ${user.name} ` : 'Guest'}</p>
      <div className="flex items-center gap-4">
        {/* For Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            className="px-4 py-1 hover:bg-teal-700"
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

        {/* For Mobile */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={handleProfileClick} className="text-white">
            <FaUser size={24} />
          </button>
          <button
            type="button"
            onClick={logout}
            className="px-4 py-1 bg-teal-700 hover:bg-teal-900"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export { NavBar, SideBar };
