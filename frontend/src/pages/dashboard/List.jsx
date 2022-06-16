import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { GoChecklist } from "react-icons/go";
import { AiOutlineTable } from "react-icons/ai";
import { FiArrowRightCircle } from "react-icons/fi";

import "./list.css";

const List = (props) => {
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
      {/* Show 3 cards when hover
         Quiz Markdown link
        Solution link 
        Score link */}

      {item === curHover ? (
        <div className='quiz-card text-focus-in'>
          <Link to='/quiz'>
            <div className='quiz-card-item '>
              {/* <CgNotes className='quiz-card-item-icon fade-in-left' /> */}
              <p className='quiz-card-item-text'>Editor</p>
              <FiArrowRightCircle className='quiz-card-item-icon' />
            </div>
          </Link>

          <div className='quiz-card-item '>
            <GoChecklist className='quiz-card-item-icon' />
            <p>Solution</p>
          </div>
          <div className='quiz-card-item'>
            <AiOutlineTable className='quiz-card-item-icon' />
            <p>Score</p>
          </div>
        </div>
      ) : (
        <div className='quiz-item'>{item}</div>
      )}
    </div>
  ));

  if (!props.isPopUp) {
    return null;
  }
  return (
    <div className='list'>
      <div className='list-overlay' onClick={props.onClose} />
      <div className='list-container'>
        <h1 className='list-container-header'>{props.course}</h1>
        <div className='list-container-quiz'>
          {quizList}
          <Link to='/quiz' className='quiz quiz-create' onClick={addCourse}>
            <FaPlus className='' />
            Add a quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default List;
