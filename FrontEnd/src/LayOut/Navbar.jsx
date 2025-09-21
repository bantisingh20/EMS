import React, { useState } from 'react';
import {
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
  UserIcon,
  KeyIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { sessiondata } from '../Context/Context';
import { useAppContext } from '../Context/AppSessionContext';

const NavBar = () => {
  const ModuleList = [
    { value: 1, name: 'Administration' }
    // ,{ value:2 , name:'Leave Management' }
    // ,{ value:3 , name:'Attendece Management' }
    , { value: 4, name: 'Document Management' }
    , { value: 5, name: 'Task Management' }
    // ,{ value:6 , name:'Salary' }
    // ,{ value: 7 , name:'Report' }
    // ,{ value:8 , name:'Trends' }

  ]
  const { user, logout, getUserInfo } = sessiondata();
  const { setCurrentModule } = useAppContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState("administration");
  const handleModuleChange = (moduleId) => {
    setSelectedModule(moduleId);
    setCurrentModule(moduleId);
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full bg-teal-800 border-b border-teal-900 z-30">
      <div className="flex items-center justify-between px-16 sm:px-6 py-3">
        <p className="text-white text-sm sm:text-lg font-semibold">
          Welcome{user ? `, ${user.name}` : ' Guest'}
        </p>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3 text-white text-sm">
            {/* Module Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded bg-teal-700 text-white hover:bg-teal-800"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Module</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-teal-700 rounded-lg shadow-lg w-40 z-40">
                  <ul className="text-white text-sm">
                    {/* List of available modules */}

                    {ModuleList.map((menu, index) => (
                      <li key={index}
                        className={`cursor-pointer px-4 py-2 hover:bg-teal-600 ${selectedModule === "administration" ? 'bg-teal-600' : ''}`}
                        onClick={() => handleModuleChange(menu.value)}
                      >
                        {menu.name}
                      </li>
                    ))}

                  </ul>
                </div>
              )}
            </div>

            {/* Other buttons */}
            <button className="hover:bg-teal-700 p-2 rounded">
              <LockClosedIcon className="h-5 w-5" />
            </button>
            <button className="hover:bg-teal-700 p-2 rounded">
              <UserIcon className="h-5 w-5" />
            </button>
            <Link to="/dashboard/change-password" className="hover:bg-teal-700 p-2 rounded">
              <KeyIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button className="text-white">
              <UserIcon className="h-5 w-5" />
            </button>
            <button
              className="px-2 py-1 text-xs bg-teal-700 hover:bg-teal-900 rounded text-white"
              onClick={logout}
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
