import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { logout, reset } from "features/auth/authSlice";
import { reset as courseReset } from "features/course/courseSlice";
import { reset as quizReset } from "features/quiz/quizSlice";
import "./navbar.css";

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    setIsDropDown(!isDropDown);
  };

  const handleLogout = () => {
    dispatch(reset());
    dispatch(logout())
      .unwrap()
      .then(() => {
        dispatch(courseReset());
        dispatch(quizReset());
      });
  };

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div className='nav'>
      <Link to='/' className='nav-home'>
        Automated Markdown Quiz
      </Link>

      <div className='nav-dd'>
        <Tooltip title='Home'>
          <IconButton aria-label='user' onClick={onClick}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        {isDropDown ? (
          <div className='nav-dd-ctn'>
            <div className='nav-dd-ctn-group'>
              <p className='nav-dd-ctn-name'>Tyler</p>
            </div>

            <div className='nav-dd-ctn-group'>
              {/* <div className='nav-dd-ctn-link' onClick={getInfo}> */}
              <div className='nav-dd-ctn-link'>
                <AccountCircleIcon className='nav-dd-ctn-link-btn' />
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
