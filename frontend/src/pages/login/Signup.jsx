import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, signupTeacher, login } from "features/auth/authSlice";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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
    role: "student",
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
    console.log("input", input);
    e.preventDefault();
    if (input.role === "student") {
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
    } else {
      dispatch(
        signupTeacher({
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
    }
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
    } else if (inputField === "role") {
      setInput({ ...input, role: value });
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
        <FormControl fullWidth>
          <RadioGroup
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            value={input.role}
            row
            fullWidth
            sx={{ display: "flex", justifyContent: "space-around", px: (4, 4) }}
            onChange={(e) => onChange(e.target.value, "role")}
          >
            <FormControlLabel
              value='student'
              control={<Radio />}
              label='Student'
            />
            <FormControlLabel
              value='teacher'
              control={<Radio />}
              label='Teacher'
            />
          </RadioGroup>
        </FormControl>
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
