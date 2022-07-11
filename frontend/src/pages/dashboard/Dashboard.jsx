import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import Popup from "reactjs-popup";
import { isLoggedIn } from "features/auth/authSlice";

import "./dashboard.css";
import List from "./List";

const Dashboard = () => {
  const courses = [
    "val101",
    "val102",
    "val103",
    "cs404",
    "val101",
    "val102",
    "val103",
    "cs404",
    "val101",
  ];

  const [course, setCourse] = useState(courses);
  const [isPopUp, setIsPopUp] = useState(false);
  const [courseCard, setCourseCard] = useState("");

  const addCourse = () => {
    setCourse([...course, "New101"]);
  };

  const onClick = (item) => {
    setIsPopUp(true);
    setCourseCard(item);
  };

  const courseList = course.map((item, index) => (
    // <div className='course' onClick={onClick(item)} key={index}>
    <div className='course' onClick={() => onClick(item)} key={index}>
      {item}
    </div>
  ));

  return (
    <div className='dashboard'>
      <List
        isPopUp={isPopUp}
        course={courseCard}
        onClose={() => setIsPopUp(false)}
      />
      <div className='dashboard-container'>
        <h1 className='dashboard-container-header'>Course List</h1>
        <div className='dashboard-container-course'>
          {courseList}
          <div className='course course-create' onClick={addCourse}>
            <FaPlus className='' />
            Add a course
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
