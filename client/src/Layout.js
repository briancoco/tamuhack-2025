import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = ({userLoggedIn}) => {
  return (
    <div>
        <div class='header-title'>-MumboJumbo.</div>
        <Outlet />
    </div>
  )
}

export default Layout