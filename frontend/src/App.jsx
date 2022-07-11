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
import Login from "pages/login/Login";
import Quiz from "pages/quiz/Quiz";
import Navbar from "components/Navbar";
import "./app.css";
import { isLoggedIn } from "features/auth/authSlice";

const axios = require("axios");
const api = "http://localhost:5000/api/users/";

const RequireAuth = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
  if (!loginStatus) {
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
          <Route path='/quiz' element={<Quiz />}></Route>
          <Route path='/login' element={<Login login={true} />}></Route>
          <Route path='/signup' element={<Login login={false} />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

//   return children;
// }

export default App;
