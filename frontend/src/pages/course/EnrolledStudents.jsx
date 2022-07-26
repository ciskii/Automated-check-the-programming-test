import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import AssignmentIcon from "@mui/icons-material/Assignment";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { getEnrolledStudents } from "features/enrollment/enrollmentSlice";
import { getScores } from "features/answer/answerSlice";
import { getAllQuestions } from "features/question/questionSlice";
import { useNavigate } from "react-router-dom";
import "./enrolled.css";

const EnrolledStudents = () => {
  const [value, setValue] = useState("0");
  const { quizzes } = useSelector((state) => state.quiz);
  const [quizId, setQuizId] = useState(quizzes[0].id);
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Answers",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<AssignmentIcon />}
          label="Student's Answers"
          onClick={linkAnswer(params.row)}
        />,
      ],
    },
  ]);
  const [newRows, setNewRows] = useState([]);

  const { isIdle, enrolledStudents } = useSelector((state) => state.enrollment);
  const { questions } = useSelector((state) => state.question);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkAnswer = useCallback(
    (row) => () => {
      navigate(`/student-answers/qId/${quizId}/sId/${row.id}`);
    },
    [quizId]
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // set quiz id state
  const switchTabHandler = (id) => {
    setQuizId(id);
    // dispatch(getScores(id));
  };

  useEffect(() => {
    if (isIdle) {
      dispatch(getEnrolledStudents(course.id))
        .unwrap()
        .then((students) => {
          dispatch(getAllQuestions(quizId))
            .unwrap()
            .then((questions) => {
              dispatch(getScores(quizId))
                .unwrap()
                .then((scores) => {
                  // add question columns
                  const newCols = [...columns];
                  let firstQuestionColIndex = 2;
                  questions.forEach((item, index) => {
                    const questionCol = {
                      field: `Q${item.id}`,
                      headerName: `${index + 1}`,
                      headerClassName: "score-header",
                      width: 70,
                    };
                    newCols.splice(firstQuestionColIndex++, 0, questionCol);
                  });
                  setColumns(newCols);

                  // create rows
                  const rows = students.map((student) => {
                    // check if student have answer or not
                    const studentScores = scores.filter((item) => {
                      return student.id === item.StudentId;
                    });

                    //  new row field
                    const newRow = {
                      id: student.id,
                      name: student.firstName + " " + student.lastName,
                    };

                    // add question's score fields
                    if (studentScores.length != 0) {
                      studentScores.forEach((item) => {
                        newRow[`Q${item.QuestionId}`] = item.score;
                      });
                    } else {
                      questions.forEach((item) => {
                        newRow[`Q${item.id}`] = 0;
                      });
                    }
                    return newRow;
                  });
                  setNewRows(rows);
                });
            });
        });
    }
  }, []);

  console.log("columns", columns);
  console.log("newRows", newRows);

  return (
    <>
      <Box sx={{ height: "100%", width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "100%",
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label='lab API tabs example'
              orientation='vertical'
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              {quizzes.map((quiz, index) => (
                <Tab
                  label={quiz.name}
                  value={index.toString()}
                  onClick={() => {
                    switchTabHandler(quiz.id);
                  }}
                />
              ))}
            </TabList>

            <TabPanel value={value} sx={{ width: "100%", py: (0, 0) }}>
              <div style={{ display: "flex", height: "100%" }}>
                <div style={{ flexGrow: 1 }}>
                  <DataGrid
                    rows={newRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </div>
              </div>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </>
  );
};

export default EnrolledStudents;
