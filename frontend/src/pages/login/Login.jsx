import React, { useState } from "react";
import { Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import "./login.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const page = props.login == true ? "Log in" : "Sign up";

  const handleSubmit = () => {};

  return (
    <div className='login'>
      <div className='login-container'>
        <h1 className='login-header'>{page}</h1>
        <div className='login-alt'>
          <div className='login-alt-item'>
            <FcGoogle className='login-alt-item-logo' />
            Continue with Google
          </div>
          <div className='login-alt-item'>
            <FaGithub className='login-alt-item-logo' />
            Continue with Github
          </div>
        </div>
      </div>
      <form className='login-form' onSubmit={() => handleSubmit} method='POST'>
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
    </div>
  );
};

export default Login;
