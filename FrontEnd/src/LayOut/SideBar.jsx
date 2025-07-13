import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBuilding, FaCalendarAlt, FaUsers, FaTachometerAlt,
  FaSteam, FaBars, FaTimes
} from 'react-icons/fa';
import { FaLock, FaUser, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';


import { sessiondata } from '../Context/Context';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { link: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { link: 'list-role', icon: <FaUsers />, label: 'Roles' },
    { link: 'list-department', icon: <FaBuilding />, label: 'Department' },
    { link: 'list-designation', icon: <FaBuilding />, label: 'Designation' },
    { link: 'list-employee', icon: <FaUsers />, label: 'Employees' },
    { link: 'leave/leavedashboard', icon: <FaCalendarAlt />, label: 'Leave' },
    { link: 'attendence', icon: <FaCalendarAlt />, label: 'Attendance' },
    { link: 'document', icon: <FaSteam />, label: 'Document' },
    {
      link: 'Report',
      icon: <FaCalendarAlt />,
      label: 'Report',
      expanded: false,
      children: [
        { label: 'Daily Report', link: '/reports/daily' },
        { label: 'Monthly Report', link: '/reports/monthly' }
      ]
    }
  ]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleExpand = (index) => {
    setMenuItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  return (
    <>
      {/* Hamburger Toggle */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-2 ${isOpen ? 'left-44' : 'left-4'} z-50 text-white bg-teal-700 p-2 rounded-md md:hidden`}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 h-screen bg-teal-800 text-white transition-transform duration-300 ease-in-out shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="px-6 py-4 text-xl md:text-2xl font-bold border-b border-teal-700">
          EMS
        </div>

        <nav className="mt-4 text-sm sm:text-base">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {!item.children ? (
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-5 py-3 rounded-lg transition hover:bg-teal-700
                       ${isActive ? 'bg-teal-700 font-semibold' : ''}`
                    }
                  >
                    <span className="text-base text-teal-200">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ) : (
                  <>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full flex items-center justify-between px-5 py-3 rounded-lg text-left transition hover:bg-teal-700"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-base text-teal-200">{item.icon}</span>
                        {item.label}
                      </span>
                      <svg
                        className={`w-4 h-4 text-teal-200 transform transition-transform ${item.expanded ? 'rotate-90' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {item.expanded && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.children.map((child, idx) => (
                          <li key={idx}>
                            <NavLink
                              to={child.link}
                              className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 text-sm rounded-md transition hover:bg-teal-700
                                 ${isActive ? 'bg-teal-700 font-semibold' : ''}`
                              }
                            >
                              <span className="w-2 h-2 rounded-full bg-teal-300"></span>
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

 

//  const NavBar = () => {
//   const { user, logout } = sessiondata();

//   return (
//     <header className="w-full bg-teal-800 border-b border-teal-900 z-30">
//       <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
//         <p className="text-white text-sm sm:text-lg font-semibold">
//           Welcome{user ? `, ${user.name}` : ' Guest'}
//         </p>

//         <div className="flex items-center gap-3 sm:gap-4">
//           {/* Desktop */}
//           <div className="hidden md:flex items-center gap-3 text-white text-sm">
//             <button className="hover:bg-teal-700 p-2 rounded">
//               <FaLock />
//             </button>
//             <button className="hover:bg-teal-700 p-2 rounded">
//               <FaUser />
//             </button>
//             <Link to="/dashboard/change-password" className="hover:bg-teal-700 p-2 rounded">
//               <FaKey />
//             </Link>
//           </div>

//           {/* Mobile */}
//           <div className="flex md:hidden items-center gap-2">
//             <button className="text-white">
//               <FaUser />
//             </button>
//             <button
//               className="px-2 py-1 text-xs bg-teal-700 hover:bg-teal-900 rounded text-white"
//               onClick={logout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

export default SideBar;
