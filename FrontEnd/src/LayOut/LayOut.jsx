import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import NavBar from './Navbar';

const LayOut = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1">
        <NavBar />
        <main className="flex-1 bg-gray-100 p-3 sm:p-5 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayOut;
