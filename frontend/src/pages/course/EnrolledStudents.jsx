import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { DataGrid } from "@mui/x-data-grid";
import { getEnrolledStudents } from "features/enrollment/enrollmentSlice";
// todo check if no quiz yet

const EnrolledStudents = () => {
  const [value, setValue] = React.useState("0");
  const { quizzes } = useSelector((state) => state.quiz);
  const { isIdle, enrolledStudents } = useSelector((state) => state.enrollment);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "score",
      headerName: "Score",
      type: "number",
      width: 90,
    },
  ];

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
                <Tab label={quiz.name} value={index.toString()} />
              ))}
            </TabList>

            {quizzes.map((quiz, index) => (
              // {/* value has to be string here */}
              <TabPanel value={index.toString()} sx={{ width: "100%" }}>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                  />
                </div>
              </TabPanel>
            ))}

            {/* <TabPanel value='2'>item 2</TabPanel> */}
          </Box>
        </TabContext>
      </Box>
    </>
  );
};

export default EnrolledStudents;
