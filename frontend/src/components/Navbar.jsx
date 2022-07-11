import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { logout, getMe } from "features/auth/authSlice";

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    setIsDropDown(!isDropDown);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginStatus");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const getInfo = () => {
    console.log("this is getInfo");
    const user = dispatch(getMe());
    console.log("user", user);
  };
  return (
    <div className='nav'>
      <Link to='/' className='nav-home'>
        Quiz Maker
      </Link>
      <div className='nav-dd'>
        <FaUserCircle className='nav-dd-btn' onClick={onClick} />
        {isDropDown ? (
          <div className='nav-dd-ctn'>
            <div className='nav-dd-ctn-group'>
              <p className='nav-dd-ctn-name'>Tyler</p>
            </div>

            <div className='nav-dd-ctn-group'>
              <div className='nav-dd-ctn-link' onClick={getInfo}>
                <FaUserCircle className='nav-dd-ctn-link-btn' />
                <p>Your Profile</p>
              </div>
              <div className='nav-dd-ctn-link'>
                <FiSettings className='nav-dd-ctn-link-btn' />
                <p>Settings</p>
              </div>
              <div className='nav-dd-ctn-link' onClick={handleLogout}>
                <FiLogOut className='nav-dd-ctn-link-btn' />
                <p>Sign out</p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
