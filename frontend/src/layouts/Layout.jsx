import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
    <div className='flex w-full'>
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
    <div className="flex flex-col w-full min-h-screen bg-lightblue">

    <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
    <Outlet/>
    </div>
    </div>
    </>
  )
}

export default Layout