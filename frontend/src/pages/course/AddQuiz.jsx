import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create, getAllQuizzes, reset } from "features/quiz/quizSlice";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const AddQuiz = (props) => {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState({
    quizName: "",
  });

  const [isValid, setIsValid] = useState({
    quizName: false,
  });

  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const onChange = (value, inputField) => {
    if (inputField === "quizName") {
      setInput({ ...input, quizName: value });
      if (value.length >= 1) {
        setIsValid({ ...isValid, quizName: true });
      } else {
        setIsValid({ ...isValid, quizName: false });
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      create({
        CourseId: course.id,
        name: input.quizName,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(reset());
        setInput({ ...input, quizName: "" });
        setIsValid({ ...isValid, quizName: false });
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
      <Button
        variant='text'
        color='success'
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Quiz
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new quiz</DialogTitle>
        <DialogContent>
          <form
            className='courseForm-form'
            method='POST'
            onSubmit={onSubmit}
            id='quiz-submit'
          >
            <TextField
              margin='normal'
              name='quizName'
              required
              fullWidth
              label='Quiz Name'
              value={input.quizName}
              onChange={(e) => onChange(e.target.value, "quizName")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {isValid.quizName ? (
            <Button
              type='submit'
              form='quiz-submit'
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

export default AddQuiz;
