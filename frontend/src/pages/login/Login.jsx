import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { login } from "features/auth/authSlice";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import { checkLoggedIn } from "features/auth/authSlice";
import "./login.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const { message, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: input.email, password: input.password }))
      .unwrap()
      .then(() => {
        dispatch(checkLoggedIn());
        // navigate("/", { replace: true });
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
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <Typography component='h1' variant='h5' className='login-header'>
          Log In
        </Typography>
      </div>
      <form className='login-form' onSubmit={handleSubmit} method='POST'>
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
        {isValid.email && isValid.password ? (
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        ) : (
          <Button variant='contained' disabled fullWidth sx={{ mt: 3, mb: 2 }}>
            Log In
          </Button>
        )}
      </form>
      {message ? <p className='login-error'>{message}</p> : <></>}
      <div className='signup-link'>
        <Link href='/signup' variant='body2' sx={{ mt: 2, mr: 6 }}>
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
