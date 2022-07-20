import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "pages/dashboard/Dashboard";
import FormDialog from "pages/dashboard/AddCourse";
import Question from "pages/question/Question";
import Navbar from "components/Navbar";
import Login from "pages/login/Login";
import Signup from "pages/login/Signup";
import Course from "pages/course/Course";
import "./app.css";

const RequireAuth = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log("isLoggedIn", isLoggedIn);
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
          {/* <Route
            path='/quiz-creator'
            element={
              <RequireAuth>
                <Question />
              </RequireAuth>
            }
          /> */}

          <Route path='/quiz-creator' element={<Question />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
