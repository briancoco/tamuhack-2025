import React from "react";
import { Outlet } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Layout = ({ userLoggedIn }) => {
  return (
    <div className="Layout">
      <div className="header">
        <div className="header-title">-MumboJumbo.</div>
        <section className="header-items">
          <div className="header-item">
            <FaUserAlt size={25} />
          </div>
        </section>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
