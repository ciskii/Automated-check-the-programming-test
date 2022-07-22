import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import Dashboard from "pages/dashboard/Dashboard";
import Question from "pages/question/Question";
import Navbar from "components/Navbar";
import Login from "pages/login/Login";
import Signup from "pages/login/Signup";
import "./app.css";

const RequireAuth = (props) => {
  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth);
  let location = useLocation();

  // ! use isSuccess instead of isIdle because we want to know when the api called is finished not when started calling api
  if (!isSuccess) {
    return null;
  } else {
    if (isLoggedIn) {
      return props.children;
    } else {
      return <Navigate to='/login' state={{ from: location }} replace={true} />;
    }
  }
};

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth>
                <Navbar />
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path='/quiz-creator'
            element={
              <RequireAuth>
                <Question />
              </RequireAuth>
            }
          />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
