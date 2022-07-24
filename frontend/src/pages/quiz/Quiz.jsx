import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import { getAllQuizzes, setQuiz } from "features/quiz/quizSlice";
import "./quiz.css";

const Quiz = (props) => {
  const dispatch = useDispatch();

  const quiz = props.quiz;

  const handleSetQuiz = () => {
    dispatch(setQuiz(quiz));
  };

  return (
    <>
      <Link
        to={`/quiz-creator/${quiz.id}`}
        className='question-link'
        onClick={handleSetQuiz}
      >
        <Button
          fullWidth
          variant='outlined'
          // onClick={() => onClick(item)}
          className='quiz'
          color='info'
        >
          {quiz.name}
        </Button>
      </Link>
    </>
  );
};

export default Quiz;

// const [curHover, setCurHover] = useState("");

// const onMouseEnter = (quiz) => {
//   setCurHover(quiz);
// };

// const onMouseLeave = () => {
//   setCurHover("");
// };

{
  /* <div
        className='quiz'
        onMouseEnter={() => onMouseEnter(quiz)}
        onMouseLeave={() => onMouseLeave(quiz)}
      >
        {quiz === curHover ? (
          <div className='quiz-card'>
            
              <div className='quiz-card-item '>
                <p className='quiz-card-item-text'>Create Quiz</p>
                <FiArrowRightCircle className='quiz-card-item-icon' />
              </div>
            </Link>
          
          </div>
        ) : (
          <div className='quiz-item'>{quiz.name}</div>
        )}
      </div> */
}
