import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className='nav'>
      <Link to='/' className='nav-home'>
        Quiz Maker
      </Link>
      <div className='nav-dd'>
        <FaUserCircle className='nav-dd-btn' />
        <div className='nav-dd-ctn'>
          <p className='nav-dd-ctn-name'>Lil Durk</p>
          <div className='nav-dd-ctn-group'>
            <div className='nav-dd-ctn-link'>
              <FiSettings />
              <p>Settings</p>
            </div>
            <div className='nav-dd-ctn-link'>
              <FiLogOut />
              <p>Log out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
