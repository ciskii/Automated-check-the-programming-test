import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SendIcon from "@mui/icons-material/Send";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import EnrolledStudents from "./EnrolledStudents";
import AddQuiz from "./AddQuiz";
import "./course.css";
// import Quiz from "pages/quiz/Quiz";
import {
  getAllQuizzes,
  deleteQuiz,
  toggleRelease,
  setQuiz,
  reset as quizReset,
} from "features/quiz/quizSlice";
import { reset as courseReset } from "features/course/courseSlice";

const Course = (props) => {
  const [value, setValue] = useState("1");
  const [rows, setRows] = useState([]);
  const [curRow, setCurRow] = useState(); // get current selected row
  const [delModal, setDelModal] = useState(false); // delete modal

  const { user } = useSelector((state) => state.auth);
  const { quizzes, isIdle } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeTab = (e, newValue) => {
    setValue(newValue);
  };

  const linkQuiz = useCallback(
    (row) => () => {
      quizReset();
      courseReset();
      navigate(`/quiz-creator/${row.id}`);
    },
    []
  );

  const linkAnswer = useCallback(
    (row) => () => {
      dispatch(setQuiz(row));
      navigate(`/quiz`);
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
    dispatch(deleteQuiz(curRow.id))
      .unwrap()
      .then(() => {
        dispatch(getAllQuizzes(props.id))
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

  const toggleReleaseQuiz = useCallback(
    (row) => () => {
      dispatch(toggleRelease({ id: row.id, isRelease: row.isRelease }))
        .unwrap()
        .then(() => {
          dispatch(getAllQuizzes(props.id))
            .unwrap()
            .then((res) => {
              if (res) {
                setRows(res);
              } else {
                setRows([]);
              }
            });
        });
    },
    []
  );

  const col = React.useMemo(
    () => [
      {
        field: "name",
        headerName: "Quiz name",
        width: 160,
        flex: 1,
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
        field: "isRelase",
        headerName: "Release quiz",
        type: "actions",
        width: 120,
        getActions: (params) => [
          params.row.isRelease ? (
            <GridActionsCellItem
              icon={<SendIcon color='success' />}
              label='Release quiz'
              onClick={toggleReleaseQuiz(params.row)}
            />
          ) : (
            <GridActionsCellItem
              icon={<CancelScheduleSendIcon color='error' />}
              label='Release quiz'
              onClick={toggleReleaseQuiz(params.row)}
            />
          ),
        ],
      },
      {
        field: "quizList",
        headerName: "Quiz list",
        type: "actions",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<AssignmentIcon />}
            label='Quiz list'
            onClick={linkQuiz(params.row)}
          />,
        ],
      },
    ],
    [linkQuiz]
  );

  const studentCol = React.useMemo(
    () => [
      {
        field: "name",
        headerName: "Quiz name",
        width: 160,
        flex: 1,
      },
      {
        field: "quizList",
        headerName: "Quiz list",
        type: "actions",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<AssignmentIcon />}
            label='Quiz list'
            onClick={linkAnswer(params.row)}
          />,
        ],
      },
    ],
    [linkAnswer]
  );

  const onClose = () => {
    dispatch(quizReset());
    props.onClose();
  };

  useEffect(() => {
    if (isIdle) {
      dispatch(getAllQuizzes(props.id))
        .unwrap()
        .then((res) => {
          if (res) {
            if (user.role === "teacher") {
              setRows(res);
            } else {
              const onlyRelease = res.filter((item) => item.isRelease);
              setRows(onlyRelease);
            }
          }
        });
    }
  }, [quizzes]);

  return (
    <div className='list'>
      <div className='list-overlay' onClick={onClose} />

      <div className='list-container'>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TabList onChange={changeTab} aria-label='lab API tabs example'>
              <Tab label='Quiz List' value='1' />
              <Tab label='Scores' value='2' />
            </TabList>
            {user.role === "teacher" ? <AddQuiz id={props.id} /> : <></>}
          </Box>

          <TabPanel value='1' sx={{ height: "100%" }}>
            {user.role === "teacher" ? (
              <DataGrid rows={rows} columns={col} />
            ) : (
              <DataGrid rows={rows} columns={studentCol} />
            )}
          </TabPanel>
          <TabPanel value='2' sx={{ px: (0, 0), height: "100%" }}>
            {quizzes ? <EnrolledStudents /> : <p>There's no quiz yet.</p>}
          </TabPanel>
        </TabContext>
      </div>

      <Dialog
        open={delModal}
        onClose={onDelModalClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Delete this quiz?</DialogTitle>
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

export default Course;
