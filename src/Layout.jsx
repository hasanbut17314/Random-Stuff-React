import React from 'react'
import Header from './comp/Header'
import Sidebar from './comp/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {

  let hideSidebar = () => {
    document.querySelector('.sideBar').classList.remove('zinda');
    document.querySelector('.overlay').classList.add('hidden');
  }

  return (
    <div className="layout">

      <div onClick={hideSidebar} className="overlay h-full w-full fixed left-0 top-0 bg-black bg-opacity-60 hidden z-[1]"></div>

      <aside className='bg-secondary min-h-screen md:py-5 py-4 px-8 lg:fixed top-0 lg:left-0 -left-64 transition-all duration-300 absolute lg:z-[1] z-[2] sideBar'>
        <Sidebar />
      </aside>

      <div className="main grid grid-cols-12">
        <div className='lg:col-span-1 lg:block hidden'></div>

        <div className='lg:col-span-11 col-span-12'>
          <Header />
          
          <div className='lg:ms-10 lg:pe-5 lg:px-0 md:px-8 px-7 md:mx-0 sm:mx-4 mx-2'>
          <Outlet />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Layout