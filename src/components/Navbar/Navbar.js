import React, { useState } from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div translate="no" className="navbar-container">
          <Link
            to="/"
            className="logo-navbar"
            onClick={() => {
              setClick(false);
            }}
          >
            OA
          </Link>
          <div
            className="hamburger-icon"
            onClick={() => {
              setClick(!click);
            }}
          >
            <i className={click === true ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click === true ? "nav-menu show" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-links"
                onClick={() => setClick(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/#about"
                className="nav-links"
                onClick={() => setClick(false)}
              >
                About Me
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/#project"
                className="nav-links"
                onClick={() => setClick(false)}
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
