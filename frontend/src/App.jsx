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

import Dashboard from "pages/dashboard/Dashboard";
import Quiz from "pages/quiz/Quiz";
import Navbar from "components/Navbar";
import Login from "pages/login/Login";
import LoginMUI from "pages/login/LoginMUI";
import Signup from "pages/login/Signup";
import SignUpMUI from "pages/login/SignupMUI";
import "./app.css";

const RequireAuth = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
  if (!isLoggedIn) {
    return <Navigate to='/login' replace={true} />;
  } else {
    return props.children;
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
            path='/quiz'
            element={
              <RequireAuth>
                <Quiz />
              </RequireAuth>
            }
          />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/loginmui' element={<LoginMUI />}></Route>
          {/* <Route path='/signup' element={<Signup />}></Route> */}
          <Route path='/signupmui' element={<SignUpMUI />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
