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
import { useNavigate } from "react-router-dom";

// todo check if there is no quiz yet -> there is nothing to render
const EnrolledStudents = () => {
  const [value, setValue] = useState("0");
  const { quizzes } = useSelector((state) => state.quiz);

  // todo check if there is no quiz yet -> what will be the initial state
  const [quizId, setQuizId] = useState(quizzes[0].id);
  const { isIdle, enrolledStudents } = useSelector((state) => state.enrollment);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkAnswer = useCallback(
    (row) => () => {
      navigate(`/student-answers/qId/${quizId}/sId/${row.id}`);
    },
    [quizId]
  );

  const columns = useMemo(
    () => [
      { field: "firstName", headerName: "First name", width: 130 },
      { field: "lastName", headerName: "Last name", width: 130 },
      {
        field: "score",
        headerName: "Score",
        type: "number",
        width: 90,
      },
      {
        field: "actions",
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
    ],
    [linkAnswer]
  );

  const rows = enrolledStudents;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isIdle) {
      dispatch(getEnrolledStudents(course.id));
    }
  }, [isIdle]);

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
                    setQuizId(quiz.id);
                  }} // set quiz id state
                />
              ))}
            </TabList>

            {quizzes.map((quiz, index) => (
              <TabPanel value={index.toString()} sx={{ width: "100%", pt: 0 }}>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    autoHeight
                  />
                </div>
              </TabPanel>
            ))}
          </Box>
        </TabContext>
      </Box>
    </>
  );
};

export default EnrolledStudents;
