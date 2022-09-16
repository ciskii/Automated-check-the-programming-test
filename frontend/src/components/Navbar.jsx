import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  const [anchorEl, setAnchorEl] = useState(null);
  // const [bg, setBg] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  // useEffect(() => {
  //   console.log("hi");
  //   console.log("user.role", user.role);
  //   setBg("#1976d2");
  //   if (user.role === "student") {
  //     setBg("#1976d2");
  //   } else if (user.role === "teacher") {
  //     setBg("#ff5722");
  //   }
  // }, []);

  // const getBg = () => {
  //   if (user.role === "teacher") {
  //     return {
  //       backgroundColor: "#ff5722",
  //     };
  //   } else if (user.role === "student") {
  //     return {
  //       backgroundColor: "#1976d2",
  //     };
  //   }
  // };

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
      {user.role === "teacher" ? (
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
          {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      ) : (
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
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
