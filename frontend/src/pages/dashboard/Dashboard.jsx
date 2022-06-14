import React, { useState } from "react";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

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

  const addCourse = () => {
    setCourse([...course, "New101"]);
  };

  const courseList = course.map((item, index) => (
    // <div className='course' onClick={setIsPopUp(true)} key={key}>
    <div className='course' onClick={() => setIsPopUp(true)} key={index}>
      {item}
    </div>
  ));

  return (
    <div className='dashboard'>
      <List isPopUp={isPopUp} onClose={() => setIsPopUp(false)} />
      <div className='dashboard-sidebar'>
        <div className='dashboard-sidebar-profile'>
          <FaUserCircle className='dashboard-sidebar-profile-icon' />
          <span className='dashboard-sidebar-profile-name'>Tarik</span>
        </div>
        <div className='dashboard-sidebar-menu'>
          <h4 className='dashboard-sidebar-menu-card'>Home</h4>
          <h4 className='dashboard-sidebar-menu-card'>Request</h4>
        </div>
      </div>
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
