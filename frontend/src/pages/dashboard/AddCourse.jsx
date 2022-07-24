import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  create,
  enrollCourse,
  getAllCourses,
  reset,
} from "features/course/courseSlice";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import Enroll from "./Enroll";

const AddCourse = () => {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState({
    courseId: "",
    courseName: "",
  });
  const [isValid, setIsValid] = useState({
    courseId: false,
    courseName: false,
  });

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChange = (value, inputField) => {
    if (inputField === "courseId") {
      setInput({ ...input, courseId: value });
      if (value.length >= 5) {
        setIsValid({ ...isValid, courseId: true });
      } else {
        setIsValid({ ...isValid, courseId: false });
      }
    } else if (inputField === "courseName") {
      setInput({ ...input, courseName: value });
      if (value.length >= 1) {
        setIsValid({ ...isValid, courseName: true });
      } else {
        setIsValid({ ...isValid, courseName: false });
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.role === "teacher") {
      dispatch(
        create({
          courseId: input.courseId,
          courseName: input.courseName,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(reset());
          dispatch(getAllCourses());
        });
    } else if (user.role === "student") {
      dispatch(enrollCourse(input.courseId))
        .unwrap()
        .then(() => {
          dispatch(reset());
          dispatch(getAllCourses());
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const teacherForm = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new course</DialogTitle>
        <DialogContent>
          <form
            className='courseForm-form'
            method='POST'
            onSubmit={onSubmit}
            id='course-submit'
          >
            <TextField
              margin='normal'
              name='courseId'
              required
              fullWidth
              label='Course ID'
              value={input.couresId}
              onChange={(e) => onChange(e.target.value, "courseId")}
            />
            <TextField
              margin='normal'
              name='courseName'
              required
              fullWidth
              label='Course Name'
              value={input.courseName}
              onChange={(e) => onChange(e.target.value, "courseName")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {isValid.courseId && isValid.courseName ? (
            <Button
              type='submit'
              form='course-submit'
              onClick={handleClose}
              variant='contained'
            >
              Submit
            </Button>
          ) : (
            <Button variant='contained' disabled>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const studentForm = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new course</DialogTitle>
        <DialogContent>
          <form
            className='courseForm-form'
            method='POST'
            onSubmit={onSubmit}
            id='course-submit'
          >
            <TextField
              margin='normal'
              name='courseId'
              required
              fullWidth
              label='Course ID'
              value={input.couresId}
              onChange={(e) => onChange(e.target.value, "courseId")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {isValid.courseId ? (
            <Button
              type='submit'
              form='course-submit'
              onClick={handleClose}
              variant='contained'
            >
              Submit
            </Button>
          ) : (
            <Button variant='contained' disabled>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <Button variant='outlined' color='success' onClick={handleClickOpen}>
        <AddCircleOutlineRoundedIcon sx={{ fontSize: 14, mb: 0.25 }} /> Course
      </Button>
      {user.role === "teacher" ? teacherForm() : studentForm()}
    </>
  );
};

export default AddCourse;
