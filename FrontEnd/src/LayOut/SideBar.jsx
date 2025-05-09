import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaUsers, FaKey, FaTachometerAlt, FaSteam, FaLock, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { sessiondata } from '../Context/Context';
import { GetAllMenulist } from '../api/MenuApi';

 const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([ 
    { link: '/dashboard', icon: <FaTachometerAlt className="text-lg" />, label: 'Dashboard' },
    { link: 'list-employees', icon: <FaUsers className="text-lg" />, label: 'Employees' },
    { link: 'list-department', icon: <FaBuilding className="text-lg" />, label: 'Department' },
    { link: 'list-designation', icon: <FaBuilding className="text-lg" />, label: 'Designation' },
    { link: 'leave/leavedashboard', icon: <FaCalendarAlt className="text-lg" />, label: 'Leave' },
    { link: 'attendence', icon: <FaCalendarAlt className="text-lg" />, label: 'Attendence' },
    { link: 'setting', icon: <FaSteam className="text-lg" />, label: 'Setting' },
    { link: 'Report', icon: <FaCalendarAlt className="text-lg" />, label: 'Report',expanded: false,children:[
      { label: 'Daily Report', link: '/reports/daily' },{ label: 'Monthly Report', link: '/reports/monthly' }
    ] }
  ]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpand = (index) => {
    setMenuItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  return (
    <>
      
      <button
  onClick={toggleSidebar}
  className={`fixed top-4 ${isOpen ? 'left-44' : 'left-4'} z-50 text-white bg-teal-700 p-2 rounded-md md:hidden`}
>

        {isOpen ? (
          //to close
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            {/* to open */}
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /> 
          </svg>
          
          </>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 h-screen bg-teal-800 text-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
         
        <div className="px-6 py-4 text-2xl font-bold border-b border-teal-700 flex justify-between items-center">
          EMS
        </div>

        {/* Menu List */}
        <nav className="mt-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {!item.children ? (
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `flex items-center px-5 py-3 text-teal-100 transition rounded-lg hover:bg-teal-700 hover:text-white ${
                        isActive ? 'bg-teal-700 text-white' : ''
                      }`
                    }
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-teal-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {item.label}
                  </NavLink>
                ) : (
                  <>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full flex items-center justify-between px-5 py-3 text-left text-teal-100 hover:bg-teal-700 hover:text-white transition rounded-lg"
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 text-teal-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        {item.label}
                      </span>
                      <svg
                        className={`w-4 h-4 text-teal-200 transform transition-transform duration-200 ${
                          item.expanded ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Submenu */}
                    {item.expanded && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.children.map((child, idx) => (
                          <li key={idx}>
                            <NavLink
                              to={child.link}
                              className={({ isActive }) =>
                                `flex items-center px-4 py-2 text-sm text-teal-100 hover:bg-teal-700 hover:text-white transition rounded-md ${
                                  isActive ? 'bg-teal-700 text-white' : ''
                                }`
                              }
                            >
                              <svg
                                className="w-4 h-4 mr-2 text-teal-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};


const NavBar = ({ isCollapsed }) => {
  const { user, logout } = sessiondata();

  useEffect(()=>{
   console.log(user);
   console.log('helo');
  },[user])
  const handleProfileClick = () => {
    // Profile logic
  };

  return ( 
    <header className="w-full bg-teal-800 shadow-md border-b border-teal-900 z-30">
      <div className="flex items-center justify-between px-6 py-4">
         
        <p className="text-xl font-bold text-white">Welcome {user ? ` ${user.name} ` : 'Guest'}</p>
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
  </header>
  );
};

export { NavBar, SideBar };
