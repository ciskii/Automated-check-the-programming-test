import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create } from "features/course/courseSlice";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./courseform.css";

const CourseForm = (props) => {
  const isFormPopUp = props.isFormPopUp;

  const [input, setInput] = useState({
    courseId: "",
    courseName: "",
  });

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
    dispatch(
      create({
        courseId: input.courseId,
        courseName: input.courseName,
      })
    )
      .unwrap()
      .then(() => {
        console.log("create success");
        props.onClose();
      });
  };

  if (!isFormPopUp) {
    return null;
  }

  return (
    <div className='courseForm'>
      <div className='courseForm-overlay' onClick={props.onClose}></div>

      <div className='courseForm-container'>
        <Typography component='h1' variant='h5' className='login-header'>
          Add a new course
        </Typography>
        <form className='courseForm-form' method='POST' onSubmit={onSubmit}>
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
          {isValid.courseId && isValid.courseName ? (
            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant='contained'
              disabled
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
