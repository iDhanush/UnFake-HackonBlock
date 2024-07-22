import React, { useState } from "react";
import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ page }) => {
  return (
    <>
      <nav className="nav">
        <Link className="logo" to="/">
          Un<span className="col">Mask</span>
        </Link>

        <ul className="navlinks">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/certification">Certification</NavLink>
          </li>
        </ul>

        {/* <Link>
          <button className="login-btn"
          onClick={()=>requestAccount()}
          >Connect wallet</button>
        </Link> */}
      </nav>
    </>
  );
};

export default Navbar;
