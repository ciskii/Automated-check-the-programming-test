import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signup, login } from "features/auth/authSlice";
import validator from "validator";

import "./page.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page = "Sign Up";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = dispatch(signup({ email, password })).unwrap();

    // *call login api after signup
    res.then(() => {
      dispatch(login({ email, password }));
    });
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (validator.isEmail(email)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };

  useEffect(() => {
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {isEmail ? (
          <button className='login-form-submit' type='submit'>
            Sign Up
          </button>
        ) : (
          <button className='login-form-submit' disabled>
            Sign Up
          </button>
        )}
      </form>
      <div className='signup-link'>
        <p>Have an account?</p>
        <Link to='/login'>Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
