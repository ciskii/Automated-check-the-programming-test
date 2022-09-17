import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { DataGrid } from "@mui/x-data-grid";

import {
  getQuizScores,
  reset as answerReset,
} from "features/answer/answerSlice";

const StudentScores = () => {
  const [value, setValue] = useState("0");
  const { quizzes } = useSelector((state) => state.quiz);
  const [quizId, setQuizId] = useState(quizzes[0].id);
  const { user } = useSelector((state) => state.auth);

  const initialColumns = [
    { field: "id", headerName: "Question", width: 100 },
    {
      field: "score",
      headerName: "Score",
      flex: 1,
    },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState([]);

  const { isIdle } = useSelector((state) => state.enrollment);
  const { questions } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // set quiz id state
  const switchTabHandler = (id) => {
    setQuizId(id);
    dispatch(getQuizScores({ QuizId: id, StudentId: user.id }))
      .unwrap()
      .then((scores) => {
        console.log("id", id);
        console.log("change tab scores", scores);
        const newScores = scores.map((item, index) => {
          return {
            id: index + 1,
            score: item.score,
          };
        });
        setRows(newScores);
      })
      .catch((err) => {
        setRows([]);
      });
  };

  useEffect(() => {
    if (isIdle) {
      dispatch(getQuizScores({ QuizId: quizId, StudentId: user.id }))
        .unwrap()
        .then((scores) => {
          console.log("scores", scores);
          const newScores = scores.map((item, index) => {
            console.log("index+1", index + 1);
            console.log("item.questionNumber", item.questionNumber);
            return {
              id: item.questionNumber,
              score: item.score,
            };
          });
          setRows(newScores);
        });
    }
    return () => {
      dispatch(answerReset());
    };
  }, []);

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
                    rows={rows}
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

export default StudentScores;
