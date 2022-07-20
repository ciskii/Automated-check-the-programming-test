import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { getAllQuizzes, setQuiz } from "features/quiz/quizSlice";
import AddQuiz from "./AddQuiz";
import "./course.css";

const Course = (props) => {
  const [curHover, setCurHover] = useState("");
  const { quizzes, message } = useSelector((state) => state.quiz);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const onMouseEnter = (item) => {
    setCurHover(item);
  };

  const onMouseLeave = () => {
    setCurHover("");
  };

  console.log("!quizzes", !quizzes);

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
          {quizzes ? (
            <>
              {quizzes.map((item, index) => (
                <div
                  className='quiz'
                  key={index}
                  onMouseEnter={() => onMouseEnter(item)}
                  onMouseLeave={() => onMouseLeave(item)}
                >
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
                    <div className='quiz-item'>{item.name}</div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <></>
          )}

          <AddQuiz />
        </div>
      </div>
    </div>
  );
};

export default Course;
