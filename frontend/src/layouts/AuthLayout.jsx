import React from 'react'
import AuthNavbar from '../components/AuthNavbar'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
    <AuthNavbar/>
    <Outlet/>
 
    </>
  )
}

export default AuthLayout