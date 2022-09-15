import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import Course from "pages/course/Course";
import StudentCourse from "pages/course/student/StudentCoures";
import AddCourse from "./AddCourse";
import {
  getAllCourses,
  setCourse,
  deleteCourse,
} from "features/course/courseSlice";
import "./dashboard.css";

const Dashboard = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [rows, setRows] = useState([]);
  const [curRow, setCurRow] = useState(); // get current selected row
  const [delModal, setDelModal] = useState(false); // delete modal

  const { user } = useSelector((state) => state.auth);
  const { course, courses, isIdle } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const onQuizModelOpen = useCallback(
    (row) => () => {
      dispatch(
        setCourse({
          id: row.id,
          courseId: row.courseId,
          name: row.name,
        })
      );
      setIsPopUp(true);
    },
    []
  );

  const onDelModalOpen = useCallback(
    (row) => () => {
      setDelModal(true);
      setCurRow(row);
    },
    []
  );

  const onDelModalClose = () => {
    setDelModal(false);
  };

  const onDelete = () => {
    onDelModalClose();
    dispatch(deleteCourse(curRow.id))
      .unwrap()
      .then(() => {
        dispatch(getAllCourses())
          .unwrap()
          .then((res) => {
            if (res) {
              setRows(res);
            } else {
              setRows([]);
            }
          });
      });
  };

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
            onClick={onDelModalOpen(params.row)}
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
            onClick={onQuizModelOpen(params.row)}
          />,
        ],
      },
    ],
    [onQuizModelOpen]
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
      </div>

      <Dialog
        open={delModal}
        onClose={onDelModalClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Delete this course?</DialogTitle>
        <DialogActions>
          <Button onClick={onDelModalClose}>Cancel</Button>
          <Button onClick={onDelete} autoFocus color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
