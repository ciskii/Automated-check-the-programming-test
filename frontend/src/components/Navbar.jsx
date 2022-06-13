import React from "react";
import { FiUpload } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className='nav'>
      <div className='nav-home'>Quiz Maker</div>
      <div className='nav-menu'>
        <span className='nav-menu-upload'>
          <FiUpload />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
