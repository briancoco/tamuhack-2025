import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = ({userLoggedIn}) => {
  return (
    <div>
        <div>Layout</div>
        <Outlet />
    </div>
  )
}

export default Layout