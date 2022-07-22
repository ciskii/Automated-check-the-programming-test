import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, login } from "features/auth/authSlice";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import validator from "validator";

import { checkLoggedIn } from "features/auth/authSlice";
import "./signup.css";

const Signup = () => {
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

  const { user, isLoggedIn, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signup({
        email: input.email,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(login({ email: input.email, password: input.password }))
          .unwrap()
          .then(() => {
            dispatch(checkLoggedIn());
            navigate("/", { replace: true });
          });
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

  if (isLoggedIn) {
    navigate("/", { replace: true });
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <Typography component='h1' variant='h5' className='login-header'>
          Sign up
        </Typography>
      </div>
      <form className='login-form' onSubmit={handleSubmit} method='POST'>
        <TextField
          margin='normal'
          required
          fullWidth
          id='firstName'
          label='First Name'
          value={input.firstName}
          onChange={(e) => onChange(e.target.value, "firstName")}
        />
        <TextField
          required
          fullWidth
          margin='normal'
          id='lastName'
          onChange={(e) => onChange(e.target.value, "lastName")}
          value={input.lastName}
          label='Last Name'
        />
        <TextField
          required
          fullWidth
          margin='normal'
          label='Email'
          value={input.email}
          onChange={(e) => onChange(e.target.value, "email")}
        />
        <TextField
          required
          fullWidth
          margin='normal'
          label='Password'
          type='password'
          value={input.password}
          onChange={(e) => onChange(e.target.value, "password")}
        />
        {isValid.email &&
        isValid.password &&
        isValid.firstName &&
        isValid.lastName ? (
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        ) : (
          <Button variant='contained' disabled fullWidth sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        )}
      </form>
      {message ? <p className='login-error'>{message}</p> : <></>}
      <div className='signup-link'>
        <Link href='/login' variant='body2' sx={{ mt: 2, mr: 6 }}>
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
