import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Layout = () => {
  return (
    <div className="Layout">
      <div className="header">
        <Link to="/" style={{textDecoration: 'none', color: '#DDD0B7'}}><div className="header-title">-MumboJumbo.</div></Link>
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
