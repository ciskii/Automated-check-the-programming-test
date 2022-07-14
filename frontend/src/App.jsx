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
import Signup from "pages/login/Signup";
import "./app.css";

const RequireAuth = (props) => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // if (!loginStatus || !isLoggedIn) {
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
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

//   return children;
// }

export default App;
