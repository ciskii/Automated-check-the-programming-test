import React from "react";
import Quiz from "./pages/quiz/Quiz";
import "./app.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/quiz' element={<Quiz />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
