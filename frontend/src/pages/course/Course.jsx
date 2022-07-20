import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddQuiz from "./AddQuiz";
import "./course.css";

const Course = (props) => {
  const [quiz, setQuiz] = useState(["mid1", "mid2", "semi", "final"]);
  const [curHover, setCurHover] = useState("");

  const addCourse = () => {
    setQuiz([...quiz, "New101"]);
  };

  const onMouseEnter = (item) => {
    setCurHover(item);
  };

  const onMouseLeave = () => {
    setCurHover("");
  };

  const quizList = quiz.map((item, index) => (
    <div
      className='quiz'
      key={index}
      onMouseEnter={() => onMouseEnter(item)}
      onMouseLeave={() => onMouseLeave(item)}
    >
      {/* 
        Editor Page - Markdown Editor
        Student Page - List enrolled students with score
      */}

      {item === curHover ? (
        <div className='quiz-card'>
          <Link to='/quiz-creator'>
            <div className='quiz-card-item '>
              <p className='quiz-card-item-text'>Editor</p>
              <FiArrowRightCircle className='quiz-card-item-icon' />
            </div>
          </Link>
          <div className='quiz-card-item '>
            <FiArrowRightCircle className='quiz-card-item-icon' />
            <p>Solution</p>
          </div>
          <div className='quiz-card-item'>
            <FiArrowRightCircle className='quiz-card-item-icon' />
            <p>Student</p>
          </div>
        </div>
      ) : (
        <div className='quiz-item'>{item}</div>
      )}
    </div>
  ));

  return (
    <div className='list'>
      <div className='list-overlay' onClick={props.onClose} />
      <div className='list-container'>
        <Typography
          sx={{ pb: (2, 2), mb: "50px", borderBottom: 1 }}
          variant='h4'
        >
          {props.courseId}
        </Typography>
        <div className='list-container-quiz'>
          {quizList}
          <AddQuiz />
        </div>
      </div>
    </div>
  );
};

export default Course;
