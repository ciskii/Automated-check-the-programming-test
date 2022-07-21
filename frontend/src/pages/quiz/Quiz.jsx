import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";

import { getAllQuizzes, setQuiz } from "features/quiz/quizSlice";
import "./quiz.css";

const Quiz = (props) => {
  const [curHover, setCurHover] = useState("");
  const dispatch = useDispatch();

  const quiz = props.quiz;

  const handleSetQuiz = () => {
    console.log("go to question");
    dispatch(setQuiz(quiz));
  };

  const onMouseEnter = (quiz) => {
    setCurHover(quiz);
  };

  const onMouseLeave = () => {
    setCurHover("");
  };

  return (
    <div
      className='quiz'
      onMouseEnter={() => onMouseEnter(quiz)}
      onMouseLeave={() => onMouseLeave(quiz)}
    >
      {quiz === curHover ? (
        <div className='quiz-card'>
          <Link
            to='/quiz-creator'
            className='question-link'
            onClick={handleSetQuiz}
          >
            <div className='quiz-card-item '>
              <p className='quiz-card-item-text'>Questions</p>
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
        <div className='quiz-item'>{quiz.name}</div>
      )}
    </div>
  );
};

export default Quiz;
