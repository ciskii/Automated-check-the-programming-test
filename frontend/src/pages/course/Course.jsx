import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import EnrolledStudents from "./EnrolledStudents";
import AddQuiz from "./AddQuiz";
import "./course.css";
import Quiz from "pages/quiz/Quiz";
import { getAllQuizzes, reset } from "features/quiz/quizSlice";

const Course = (props) => {
  const [value, setValue] = useState("1");
  const [rows, setRows] = useState([]);
  const { quizzes, isIdle } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            // onClick={openQuizModal(params)}
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
              icon={<SendIcon color='green' />}
              label='Release quiz'
              // onClick={openQuizModal(params)}
            />
          ) : (
            <GridActionsCellItem
              icon={<CancelScheduleSendIcon color='error' />}
              label='Release quiz'
              // onClick={openQuizModal(params)}
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
            // onClick={openQuizModal(params.row)}
          />,
        ],
      },
    ]
    // [openQuizModal]
  );

  const onClose = () => {
    dispatch(reset());
    props.onClose();
  };

  useEffect(() => {
    if (isIdle) {
      dispatch(getAllQuizzes(props.id))
        .unwrap()
        .then((res) => {
          console.log("res", res);
          setRows(res);
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
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Quiz List' value='1' />
              <Tab label='Scores' value='2' />
            </TabList>
            <AddQuiz id={props.id} />
          </Box>

          <TabPanel value='1' sx={{ height: "100%" }}>
            <DataGrid rows={rows} columns={col} />
            {/* <div className='list-container-quiz'> */}
            {/* {quizzes ? (
                  <>
                    {quizzes.map((quiz, index) => (
                      <Quiz quiz={quiz} key={index} />
                    ))}
                  </>
                ) : (
                  <></>
                )} */}

            {/* <AddQuiz id={props.id} /> */}
            {/* </div> */}
          </TabPanel>
          <TabPanel value='2' sx={{ px: (0, 0), height: "100%" }}>
            {quizzes ? <EnrolledStudents /> : <p>There's no quiz yet.</p>}
          </TabPanel>
        </TabContext>

        {/* </Box> */}
      </div>
    </div>
  );
};

export default Course;
