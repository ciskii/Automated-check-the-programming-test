import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import { login } from "features/auth/authSlice";

import "./page.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setisPassword] = useState(false);
  const { user, message, isLoggedIn } = useSelector((state) => state.auth);
  // const emailField = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page = "Log In";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      dispatch(login({ email, password }));
    }

    // * if put navigate function here: it'll navigate to the '/' path before isSuccess update so it'll redirect to this page again
    // * it has to be in useEffect
    // * -----> navigate("/"); <-----
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (validator.isEmail(e.target.value)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setisPassword(true);
    } else {
      setisPassword(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn || user) {
      navigate("/");
    }
  }, [user, isLoggedIn]);

  return (
    <div className='login'>
      <div className='login-container'>
        <h1 className='login-header'>{page}</h1>
      </div>
      <form className='login-form' onSubmit={handleSubmit} method='POST'>
        <label name='email' className='login-form-label'>
          Email
        </label>
        <input
          className='login-form-input'
          type='email'
          name='email'
          value={email}
          onChange={onChangeEmail}
        />
        <label className='login-form-label' name='password'>
          Password
        </label>
        <input
          className='login-form-input'
          type='password'
          name='password'
          value={password}
          onChange={onChangePassword}
        />
        {isEmail && isPassword ? (
          <button className='login-form-submit' type='submit'>
            Log In
          </button>
        ) : (
          <button className='login-form-submit' disabled>
            Log In
          </button>
        )}
      </form>
      {message ? <p className='login-error'>{message}</p> : <></>}
      <div className='signup-link'>
        <p>Don't have an account?</p>
        <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
