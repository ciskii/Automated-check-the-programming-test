import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Course from "pages/course/Course";
import AddCourse from "./AddCourse";
import { getAllCourses, setCourse } from "features/course/courseSlice";
import "./dashboard.css";
import { getAllQuizzes } from "features/quiz/quizSlice";

const Dashboard = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const { course, courses, isIdle } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const onClick = (item) => {
    dispatch(
      setCourse({
        id: item.id,
        courseId: item.courseId,
        name: item.name,
      })
    );
    dispatch(getAllQuizzes(item.id))
      .unwrap()
      .then(() => setIsPopUp(true));
  };

  useEffect(() => {
    if (isIdle) {
      dispatch(getAllCourses());
    }
  }, [courses, dispatch]);

  return (
    <div className='dashboard'>
      <div className='dashboard-container'>
        {isPopUp ? (
          <Course
            isPopUp={isPopUp}
            onClose={() => setIsPopUp(false)}
            id={course.id}
            courseId={course.courseId}
            courseName={course.name}
          />
        ) : (
          <></>
        )}

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
                color='info'
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
