import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { isLoggedIn } from "features/auth/authSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import List from "./List";
import "./dashboard.css";

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
  // const [isSignup, setIsSignup] = useState(false);
  // const { isSuccess } = useSelector((state) => state.auth);

  // const notify = () =>
  //   toast.success("🦄 Wow so easy!", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: false,
  //     draggable: false,
  //     progress: undefined,
  //   });

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
