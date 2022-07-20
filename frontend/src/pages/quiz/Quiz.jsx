import React from "react";
import "./quiz.css";

const Quiz = () => {
  return (
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
  );
};

export default Quiz;
