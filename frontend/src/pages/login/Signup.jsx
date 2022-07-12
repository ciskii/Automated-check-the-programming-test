import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { signup, login, isLoggedIn } from "features/auth/authSlice";

import "./page.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isSuccess, isLoading, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page = "Sign up";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signup({ email, password }));
    console.log("isSuccess", isSuccess);
    if (isSuccess) {
      console.log("calling login");
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    console.log("user", user);
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn || user) {
      navigate("/");
    }
  }, [user, isLoggedIn, dispatch]);

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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label className='login-form-label' name='password'>
          Password
        </label>
        <input
          className='login-form-input'
          type='password'
          name='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className='login-form-submit' type='submit'>
          Submit
        </button>
      </form>
      <div className='signup-link'>
        <p>Have an account?</p>
        <Link to='/login'>Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
