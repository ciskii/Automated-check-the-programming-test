import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupTeacher } from "features/auth/authSlice";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import validator from "validator";

import { logout, reset } from "features/auth/authSlice";
import { reset as courseReset } from "features/course/courseSlice";
import { reset as quizReset } from "features/quiz/quizSlice";
import "./navbar.css";

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const { user, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFormClickOpen = () => {
    setAnchorEl(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setAnchorEl(null);
    setFormOpen(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signupTeacher({
        email: input.email,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName,
      })
    )
      .unwrap()
      .then((res) => {
        setAnchorEl(null);
        setFormOpen(false);
      });
  };

  const onChange = (value, inputField) => {
    if (inputField === "email") {
      setInput({ ...input, email: value });
      if (validator.isEmail(value)) {
        setIsValid({ ...isValid, email: true });
      } else {
        setIsValid({ ...isValid, email: false });
      }
    } else if (inputField === "password") {
      setInput({ ...input, password: value });
      if (value.length >= 8) {
        setIsValid({ ...isValid, password: true });
      } else {
        setIsValid({ ...isValid, password: false });
      }
    } else if (inputField === "firstName") {
      setInput({ ...input, firstName: value });
      if (value.length >= 1) {
        setIsValid({ ...isValid, firstName: true });
      } else {
        setIsValid({ ...isValid, firstName: false });
      }
    } else if (inputField === "lastName") {
      setInput({ ...input, lastName: value });
      if (value.length >= 1) {
        setIsValid({ ...isValid, lastName: true });
      } else {
        setIsValid({ ...isValid, lastName: false });
      }
    }
  };

  // const signUpTeacher = () => {
  //   return (
  //     <Dialog open={formOpen} onClose={handleFormClose}>
  //       <DialogTitle>Sign up teacher</DialogTitle>
  //       <DialogContent>
  //         <form
  //           className='login-form'
  //           id='teacher-submit'
  //           onSubmit={handleSubmit}
  //           method='POST'
  //         >
  //           <TextField
  //             margin='normal'
  //             required
  //             fullWidth
  //             id='firstName'
  //             label='First Name'
  //             value={input.firstName}
  //             onChange={(e) => onChange(e.target.value, "firstName")}
  //           />
  //           <TextField
  //             required
  //             fullWidth
  //             margin='normal'
  //             id='lastName'
  //             onChange={(e) => onChange(e.target.value, "lastName")}
  //             value={input.lastName}
  //             label='Last Name'
  //           />
  //           <TextField
  //             required
  //             fullWidth
  //             margin='normal'
  //             label='Email'
  //             value={input.email}
  //             onChange={(e) => onChange(e.target.value, "email")}
  //           />
  //           <TextField
  //             required
  //             fullWidth
  //             margin='normal'
  //             label='Password'
  //             type='password'
  //             value={input.password}
  //             onChange={(e) => onChange(e.target.value, "password")}
  //           />
  //         </form>
  //         {message ? <p className='login-error'>{message}</p> : <></>}
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleFormClose}>Cancel</Button>
  //         {isValid.email &&
  //         isValid.password &&
  //         isValid.firstName &&
  //         isValid.lastName ? (
  //           <Button type='submit' form='teacher-submit' variant='contained'>
  //             Submit
  //           </Button>
  //         ) : (
  //           <Button variant='contained' disabled>
  //             Submit
  //           </Button>
  //         )}
  //       </DialogActions>
  //     </Dialog>
  //   );
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
          <MenuItem onClick={handleClose}>My account</MenuItem>
          {/* <MenuItem onClick={handleFormClickOpen}>Sign up teacher</MenuItem> */}
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

      {/* {signUpTeacher()} */}
    </div>
  );
};

export default Navbar;
