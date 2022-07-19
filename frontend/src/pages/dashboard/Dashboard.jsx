import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Course from "pages/course/Course";
import CourseForm from "../course/CourseForm";
import "./dashboard.css";

// Show Courses
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
  const [isFormPopUp, setIsFormPopUp] = useState(false);
  const [courseCard, setCourseCard] = useState("");

  const addCourse = () => {
    setCourse([...course, "New101"]);
  };

  const onClick = (item) => {
    setIsPopUp(true);
    setCourseCard(item);
  };

  const courseList = course.map((item, index) => (
    <div className='course' onClick={() => onClick(item)} key={index}>
      {item}
    </div>
  ));

  return (
    <div className='dashboard'>
      <Course
        isPopUp={isPopUp}
        course={courseCard}
        onClose={() => setIsPopUp(false)} // Close pop up when user click at overlay
      />
      <CourseForm
        isFormPopUp={isFormPopUp}
        onClose={() => setIsFormPopUp(false)} // Close pop up when user click at overlay
      />
      <div className='dashboard-container'>
        <h1 className='dashboard-container-header'>Course List</h1>
        <div className='dashboard-container-course'>
          {courseList}
          <div
            className='course course-create'
            onClick={() => setIsFormPopUp(true)}
          >
            <FaPlus className='' />
            Add a course
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
