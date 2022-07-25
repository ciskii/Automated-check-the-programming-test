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
import Answer from "pages/answer/Answer";
import Navbar from "components/Navbar";
import Login from "pages/login/Login";
import Signup from "pages/login/Signup";
import Preview from "pages/preview/Preview";
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

const Redirect = (props) => {
  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!isSuccess) {
    return null;
  } else {
    if (isLoggedIn) {
      return <Navigate to='/' state={{ from: location }} />;
    } else {
      return props.children;
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
            path='/quiz-creator/:QuizId'
            element={
              <RequireAuth>
                <Question />
              </RequireAuth>
            }
          />
          <Route
            path='/quiz/:QuizId'
            element={
              <RequireAuth>
                <Answer />
              </RequireAuth>
            }
          />
          <Route
            path='/student-answers/qId/:QuizId/sId/:StudentId'
            element={
              <RequireAuth>
                <Preview />
              </RequireAuth>
            }
          />
          <Route
            path='/login'
            element={
              <Redirect>
                <Login />
              </Redirect>
            }
          />
          <Route
            path='/signup'
            element={
              <Redirect>
                <Signup />
              </Redirect>
            }
          />
          <Route
            path='*'
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
