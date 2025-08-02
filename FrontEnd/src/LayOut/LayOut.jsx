import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import NavBar from './Navbar';
import { useAppContext } from '../Context/AppSessionContext';

const LayOut = () => {

  const {currentModule} = useAppContext();
  

  return (
    <div className="flex h-screen overflow-none">
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
