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

const EnrolledStudents = () => {
  const [value, setValue] = useState("0");
  const { quizzes } = useSelector((state) => state.quiz);

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

  function getFullName(params) {
    return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
  }

  const columns = useMemo(
    () => [
      // { field: "firstName", headerName: "First name", width: 130 },
      // { field: "lastName", headerName: "Last name", width: 130 },
      { field: "id", headerName: "ID", width: 50 },
      {
        field: "fullName",
        headerName: "Full name",
        width: 160,
        valueGetter: getFullName,
      },
      {
        field: "score",
        headerName: "Score",
        type: "number",
        width: 130,
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
    ],
    [linkAnswer]
  );

  const rows = enrolledStudents;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isIdle) {
      dispatch(getEnrolledStudents(course.id))
        .unwrap()
        .then((res) => {
          console.log("res", res);
        });
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
              <TabPanel
                value={index.toString()}
                sx={{ width: "100%", py: (0, 0) }}
              >
                <div style={{ display: "flex", height: "100%" }}>
                  <div style={{ flexGrow: 1 }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      // checkboxSelection
                    />
                  </div>
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
