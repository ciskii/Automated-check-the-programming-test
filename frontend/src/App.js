import React from "react";
import Quiz from "./pages/quiz/Quiz";
import "./app.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <Router>
      <div className='app'>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/quiz' element={<Quiz />}></Route>
          <Route path='/login' element={<Login login={true} />}></Route>
          <Route path='/signup' element={<Login login={false} />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
