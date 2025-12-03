import React from 'react'
import Navbar from './DashboardLayout'
import { Outlet } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'

const RootLayout = () => {
  return (
    <div>
        <DashboardLayout/>
    </div>
  )
}

export default RootLayout