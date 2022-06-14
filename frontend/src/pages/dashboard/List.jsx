import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./list.css";
import { Link } from "react-router-dom";

const List = (props) => {
  const courses = ["mid1", "mid2", "semi", "final"];

  const [course, setCourse] = useState(courses);
  // const [title, setTitle] = useState()

  const addCourse = () => {
    setCourse([...course, "New101"]);
  };

  const courseList = course.map((item, index) => (
    // <div className='course' onClick={setIsPopUp(true)} key={key}>
    <div className='quiz-list' key={index}>
      {item}
    </div>
  ));

  if (!props.isPopUp) {
    return null;
  }
  return (
    <div className='list'>
      <div className='list-overlay' onClick={props.onClose} />
      <div className='list-container'>
        {/* <input
          type='text'
          value={this.state.value}
          onChange={this.handleChange}
        /> */}
        <h1 className='list-container-header'>Quiz List</h1>
        <div className='list-container-quiz'>
          {courseList}
          <Link
            to='/quiz'
            className='quiz-list quiz-create'
            onClick={addCourse}
          >
            <FaPlus className='' />
            Add a quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default List;
