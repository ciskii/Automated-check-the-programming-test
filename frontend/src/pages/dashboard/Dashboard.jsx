import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Course from "pages/course/Course";
import AddCourse from "./AddCourse";
import { getAllCourses } from "features/course/courseSlice";
import "./dashboard.css";

const Dashboard = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [course, setCourse] = useState({
    courseId: "",
    courseName: "",
  });

  const { courses, isIdle } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const onClick = (item) => {
    setIsPopUp(true);
    setCourse({
      courseId: item.courseId,
      name: item.name,
    });
  };

  useEffect(() => {
    if (isIdle) {
      dispatch(getAllCourses());
    }
  }, [courses, dispatch]);

  return (
    <div className='dashboard'>
      <div className='dashboard-container'>
        <Course
          isPopUp={isPopUp}
          onClose={() => setIsPopUp(false)}
          courseId={course.courseId}
          courseName={course.name}
        />

        <Typography
          sx={{ pb: (2, 2), mb: "50px", borderBottom: 1 }}
          variant='h4'
        >
          Course List
        </Typography>

        <div className='dashboard-container-course'>
          {courses.map((item) => (
            <div className='course' key={item.id}>
              <Button
                fullWidth
                variant='outlined'
                onClick={() => onClick(item)}
              >
                {item.courseId}
              </Button>
            </div>
          ))}
          <AddCourse />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
