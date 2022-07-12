import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { signup, login } from "features/auth/authSlice";

import "./page.css";

const Page = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page = props.page === "login" ? "Log in" : "Sign up";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (page === "Log in") {
      const res = dispatch(login({ email, password })).unwrap();
      console.log("res", res);
      //! if put navigate function here: it'll navigate to the '/' path before isSuccess update so it'll redirect to this page again
      //! it has to be in useEffect
      // navigate("/");
    } else if (page === "Sign up") {
      dispatch(signup({ email, password }));
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
  }, [user, isSuccess]);

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
      {page === "Log in" ? (
        <div className='signup-link'>
          <p>Don't have an account?</p>
          <Link to='/signup'>Sign up</Link>
        </div>
      ) : (
        <div className='signup-link'>
          <p>Have an account?</p>
          <Link to='/login'>Log in</Link>
        </div>
      )}
    </div>
  );
};

export default Page;
