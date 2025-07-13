
import React from 'react';
import {
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
  UserIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { sessiondata } from '../Context/Context';

const NavBar = () => {
  const { user, logout } = sessiondata();

  return (
    <header className="w-full bg-teal-800 border-b border-teal-900 z-30">
      <div className="flex items-center justify-between px-16 sm:px-6 py-3">
        <p className="text-white text-sm sm:text-lg font-semibold">
          Welcome{user ? `, ${user.name}` : ' Guest'}
        </p>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3 text-white text-sm">
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
