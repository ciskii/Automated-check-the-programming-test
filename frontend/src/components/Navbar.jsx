import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { logout, reset } from "features/auth/authSlice";
import { reset as courseReset } from "features/course/courseSlice";
import { reset as quizReset } from "features/quiz/quizSlice";
import "./navbar.css";

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsDropDown(!isDropDown);
    dispatch(reset());
    dispatch(logout())
      .unwrap()
      .then(() => {
        dispatch(courseReset());
        dispatch(quizReset());
      });
  };

  return (
    <div className='nav'>
      <Link to='/' className='nav-home'>
        Automated Markdown Quiz
      </Link>

      <IconButton
        aria-label='user'
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon fontSize='large' style={{ color: "#fff" }} />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <p className='nav-dd-ctn-name'>
          {user.firstName} {user.lastName}
        </p>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;

{
  /* const onClick = () => {
    setIsDropDown(!isDropDown);
  }; */
}
{
  /* <div className='nav-dd'>
        <Tooltip title='Home'>
          <IconButton aria-label='user' onClick={onClick}>
            <AccountCircleIcon fontSize='large' style={{ color: "#fff" }} />
          </IconButton>
        </Tooltip>
        {isDropDown ? (
          <div className='nav-dd-ctn'>
            <div className='nav-dd-ctn-group'>
              <p className='nav-dd-ctn-name'>
                {user.firstName} {user.lastName}
              </p>
            </div>

            <div className='nav-dd-ctn-group'>
              <div className='nav-dd-ctn-link'>
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
      </div> */
}
