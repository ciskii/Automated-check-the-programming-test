import React from "react";
import "./courseform.css";

const CourseForm = (props) => {
  const isFormPopUp = props.isFormPopUp;

  if (!isFormPopUp) {
    return null;
  }
  return (
    <div className='courseForm'>
      <div className='courseForm-overlay' onClick={props.onClose}></div>
      <div className='courseForm-container'></div>
    </div>
  );
};

export default CourseForm;
