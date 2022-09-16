import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import { create, enrollCourse, reset } from "features/course/courseSlice";
const AddCourse = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    courseId: "",
    courseName: "",
  });
  const [semester, setSemester] = useState(1);
  const [year, setYear] = useState();

  const resetState = () => {
    setInput({ ...input, courseId: "", courseName: "" });
    setSemester(1);
    setOpen(false);
  };

  const semesterChange = (e) => {
    setSemester(e.target.value);
  };
  const yearChange = (e) => {
    setYear(e.target.value);
  };

  const [isValid, setIsValid] = useState({
    courseId: false,
    courseName: false,
  });

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChange = (value, inputField) => {
    if (inputField === "courseId") {
      setInput({ ...input, courseId: value });
      if (value.length >= 5 && value.length <= 8) {
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
    if (user.role === "teacher") {
      dispatch(
        create({
          courseId: input.courseId,
          courseName: input.courseName,
          semester: semester,
          year: year,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(reset());
          resetState();
          // dispatch(getAllCourses());
        });
    } else if (user.role === "student") {
      dispatch(
        enrollCourse({
          courseId: input.courseId,
          semester: semester,
          year: year,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(reset());
          resetState();
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetState();
  };

  const addCourseForm = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {user.role === "teacher" ? (
            <>Create a new course</>
          ) : (
            <>Enroll a new course</>
          )}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              margin='dense'
              name='courseId'
              required
              fullWidth
              label='Course ID'
              value={input.couresId}
              onChange={(e) => onChange(e.target.value, "courseId")}
              helperText='Please use 5-8 characters and Course ID is case sensitive'
            />
            {user.role === "teacher" ? (
              <TextField
                margin='dense'
                name='courseName'
                required
                fullWidth
                label='Course Name'
                value={input.courseName}
                onChange={(e) => onChange(e.target.value, "courseName")}
              />
            ) : (
              <></>
            )}

            <TextField
              margin='dense'
              name='year'
              required
              fullWidth
              label='Year'
              value={year}
              onChange={yearChange}
              helperText='Please use only last 2 digits of the year'
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: "16px" }}>
            <InputLabel id='semester-select-label'>Semester</InputLabel>
            <Select
              margin='dense'
              labelId='semester-select-label'
              id='semester-select'
              value={semester}
              label='Semester'
              onChange={semesterChange}
            >
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {(user.role === "teacher" &&
            isValid.courseId &&
            isValid.courseName) ||
          (user.role === "student" && isValid.courseId) ? (
            <Button
              type='submit'
              form='course-submit'
              onClick={onSubmit}
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

  useEffect(() => {
    const date = new Date().getFullYear();
    const newDate = parseInt((date + 543).toString().slice(2));
    setYear(newDate);
  }, []);

  return (
    <>
      <Button
        variant='outlined'
        color='success'
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        {user.role === "teacher" ? (
          <>Create a new course</>
        ) : (
          <>Enroll a new course</>
        )}
      </Button>

      {addCourseForm()}
    </>
  );
};

export default AddCourse;
