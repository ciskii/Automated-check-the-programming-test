import React from "react";
import { FiUpload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className='nav'>
      <Link to='/' className='nav-home'>
        Quiz Maker
      </Link>
      <div className='nav-menu'>
        <span className='nav-menu-upload'>
          <FiUpload />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
