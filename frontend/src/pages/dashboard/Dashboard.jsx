import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Course from "pages/course/Course";
import StudentCourse from "pages/course/student/StudentCoures";
import AddCourse from "./AddCourse";
import { getAllCourses, setCourse } from "features/course/courseSlice";
import { getAllQuizzes } from "features/quiz/quizSlice";
import "./dashboard.css";

const Dashboard = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { course, courses, isIdle } = useSelector((state) => state.course);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  const openQuizModal = useCallback(
    (row) => () => {
      dispatch(
        setCourse({
          id: row.id,
          courseId: row.courseId,
          name: row.name,
        })
      );
      setIsPopUp(true);

      // dispatch(getAllQuizzes(row.id))
      //   .unwrap()
      //   .then(() => setIsPopUp(true));
    },
    []
  );

  const col = React.useMemo(
    () => [
      {
        field: "courseId",
        headerName: "Course ID",
        width: 100,
      },
      {
        field: "name",
        headerName: "Course name",
        width: 160,
        flex: 1,
      },
      {
        field: "semester",
        headerName: "Semester",
        width: 100,
      },
      {
        field: "year",
        headerName: "Year",
        width: 80,
      },
      {
        field: "delete",
        headerName: "Delete",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon color='error' />}
            label='Delete course'
            // onClick={openQuizModal(params)}
          />,
        ],
      },
      {
        field: "quizList",
        headerName: "Quiz list",
        type: "actions",
        width: 150,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<AssignmentIcon />}
            label='Quiz list'
            onClick={openQuizModal(params.row)}
          />,
        ],
      },
    ],
    [openQuizModal]
  );

  useEffect(() => {
    if (isIdle) {
      dispatch(getAllCourses())
        .unwrap()
        .then((res) => {
          setRows(res);
        });
    }
  }, [courses]);

  return (
    <div className='dashboard'>
      <div className='dashboard-container'>
        {isPopUp ? (
          <>
            {user.role === "teacher" ? (
              <Course
                isPopUp={isPopUp}
                onClose={() => setIsPopUp(false)}
                id={course.id}
                courseId={course.courseId}
                courseName={course.name}
              />
            ) : (
              <StudentCourse
                isPopUp={isPopUp}
                onClose={() => setIsPopUp(false)}
                id={course.id}
                courseId={course.courseId}
                courseName={course.name}
              />
            )}
          </>
        ) : (
          <></>
        )}

        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h5'>Course List</Typography>
          <AddCourse />
        </Stack>

        <DataGrid rows={rows} columns={col} />

        {/* <div className='dashboard-container-course'>
          {courses.map((item) => (
            <div className='course' key={item.id}>
              <Button
                sx={{ display: "block" }}
                fullWidth
                variant='outlined'
                onClick={() => onClick(item)}
                color='info'
                className='course'
                key={item.id}
              >
                <Typography variant='h6'>{item.courseId}</Typography>
                <Typography variant='caption' sx={{ color: "warning" }}>
                  {item.name}
                </Typography>
              </Button>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
