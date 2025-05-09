import React from 'react';

import { SideBar,NavBar } from './SideBar';
import { Outlet } from 'react-router-dom';

const LayOut = () => {
  return (
    <>
      <div className='flex h-screen overflow-auto'>
        <SideBar />
        <div className='flex-1 flex flex-col'>
            <NavBar />
            <main className="flex-1 bg-gray-50 p-4 overflow-auto">
            <Outlet />
            </main>
        </div>
      </div>
    </>
  )
}

export default LayOut
