import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create, getAllCourses, reset } from "features/course/courseSlice";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddCourse = () => {
  const [open, setOpen] = React.useState(false);

  const [input, setInput] = useState({
    courseId: "",
    courseName: "",
  });

  //props
  const [isValid, setIsValid] = useState({
    courseId: false,
    courseName: false,
  });

  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    //props
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
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        Add a new course
        {/* props */}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new course</DialogTitle>
        {/* props */}
        <DialogContent>
          <form
            className='courseForm-form' //props
            method='POST'
            onSubmit={onSubmit}
            id='course-submit' //props
          >
            <TextField
              margin='normal'
              name='courseId' //props
              required
              fullWidth
              label='Course ID' //props
              value={input.couresId}
              onChange={(e) => onChange(e.target.value, "courseId")}
            />
            <TextField
              margin='normal'
              name='courseName' //props
              required
              fullWidth
              label='Course Name' //props
              value={input.courseName}
              onChange={(e) => onChange(e.target.value, "courseName")} //props
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
    </>
  );
};

export default AddCourse;
