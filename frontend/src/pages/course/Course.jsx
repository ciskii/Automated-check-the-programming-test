import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import EnrolledStudents from "./EnrolledStudents";
import AddQuiz from "./AddQuiz";
import "./course.css";
import Quiz from "pages/quiz/Quiz";

const Course = (props) => {
  const [value, setValue] = useState("1");
  const { quizzes } = useSelector((state) => state.quiz);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='list'>
      <div className='list-overlay' onClick={props.onClose} />

      <div className='list-container'>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            typography: "body1",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
              >
                <Tab label='Quiz List' value='1' />
                <Tab label='Scores' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <div className='list-container-quiz'>
                {quizzes ? (
                  <>
                    {quizzes.map((quiz, index) => (
                      <Quiz quiz={quiz} key={index} />
                    ))}
                  </>
                ) : (
                  <></>
                )}

                <AddQuiz id={props.id} />
              </div>
            </TabPanel>
            <TabPanel value='2' sx={{ px: (0, 0), height: "100%" }}>
              {quizzes ? <EnrolledStudents /> : <p>There's no quiz yet.</p>}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Course;
