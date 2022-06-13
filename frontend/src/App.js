import React from "react";
import Quiz from "./pages/quiz/Quiz";
import "./app.css";
import Navbar from "./components/Navbar";
import Mirror from "./pages/quiz/Mirror";

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      {/* <Mirror /> */}
      <Quiz />
    </div>
  );
};

export default App;
