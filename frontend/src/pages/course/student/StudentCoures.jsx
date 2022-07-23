import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import AddQuiz from "../AddQuiz";
import StudentQuiz from "pages/quiz/student/StudentQuiz";
import "./studentCourse.css";

const StudentCourse = (props) => {
  const [value, setValue] = React.useState("1");
  const { quizzes } = useSelector((state) => state.quiz);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='list'>
      <div className='list-overlay' onClick={props.onClose} />

      <div className='list-container'>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
              >
                <Tab label='Quizzes' value='1' />
                <Tab label='scores' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <div className='list-container-quiz'>
                {quizzes ? (
                  <>
                    {quizzes.map((quiz, index) => (
                      <StudentQuiz quiz={quiz} key={index} />
                    ))}
                  </>
                ) : (
                  <></>
                )}

                <AddQuiz id={props.id} />
              </div>
            </TabPanel>
            <TabPanel value='2'>Scores</TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default StudentCourse;
