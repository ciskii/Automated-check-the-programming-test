import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { debounce } from "lodash";

import MarkdownRenderer from "./MarkdownRenderer";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
// import { cpp } from "@codemirror/lang-cpp";
// import { java } from "@codemirror/lang-java";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";

import { languages } from "@codemirror/language-data";
import { githubLight } from "@uiw/codemirror-theme-github";
import "katex/dist/katex.min.css";
import CodeMirror from "@uiw/react-codemirror";

import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import {
  create,
  getAllQuestions,
  deleteQuestion,
  reset,
} from "features/question/questionSlice";
import { reset as quizReset } from "features/quiz/quizSlice";
import { reset as courseReset } from "features/course/courseSlice";
// import { myTheme } from "utils/theme";
import "github-markdown-css";
import "./question.css";

const Question = () => {
  const [codeCur, setCodeCur] = useState(""); // current code at selected page
  const [page, setPage] = useState(1); // total page number
  const [curPage, setCurPage] = useState(1); // current selected page
  const [curQuestions, setCurQuestions] = useState([]); // current questions on client
  const [curParams, setCurParams] = useState("");
  const [curStudent, setCurStudent] = useState("");
  const [curSolution, setCurSolution] = useState("");
  const [curLanguage, setCurLanguage] = useState("");
  const [curLanguageFunc, setcurLanguageFunc] = useState(() => javascript());

  const [open, setOpen] = useState(false); // delete modal
  const [solOpen, setSolOpen] = useState(false);

  const { isIdle } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const curLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setCurLanguage(newLanguage);
    languageFuncChangeHandler(newLanguage);
  };

  const languageFuncChangeHandler = (newLanguage) => {
    if (newLanguage === "javascript") {
      setcurLanguageFunc(() => javascript());
    } else if (newLanguage === "php") {
      setcurLanguageFunc(() => php());
    } else if (newLanguage === "python") {
      setcurLanguageFunc(() => python());
    }
  };

  const [tabIndex, setTabIndex] = useState("1");
  const tabIndexChange = (e, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const getNewQuestion = () => {
    // ! what a step! HOLY
    const newQuestion = curQuestions.map((item) => {
      return { ...item };
    }); // copy new object in question array

    newQuestion[curPage - 1].questionObj = codeCur; // update selected page question to current code
    newQuestion[curPage - 1].params = curParams; // update params
    newQuestion[curPage - 1].student = curStudent; // update params
    newQuestion[curPage - 1].solution = curSolution; // update params
    newQuestion[curPage - 1].language = curLanguage; // update params

    return newQuestion;
  };

  const onDelete = () => {
    handleClose();
    if (curQuestions.length !== 0) {
      const newQuestion = getNewQuestion();
      // ~~~~~~~~~~~~ save current questions ~~~~~~~~~~~ //
      dispatch(create({ newQuestion: newQuestion, QuizId: params.QuizId }))
        .unwrap()
        .then(() => {
          // ~~~~~~~~ get new saved questions~~~~~~~ //
          dispatch(getAllQuestions(params.QuizId))
            .unwrap()
            .then((res) => {
              // ~~~~~~~~~~~ delete selected question ~~~~~~~~~~~ //
              dispatch(deleteQuestion(res[curPage - 1].id))
                .unwrap()
                .then(() => {
                  //  get new questions after delete selected question  //
                  dispatch(getAllQuestions(params.QuizId))
                    .unwrap()
                    .then((res) => {
                      console.table(res);
                      setCurQuestions(res);
                      setPage(res.length);
                      setCurPage(1);

                      setCodeCur(res[0].questionObj);
                      setCurParams(res[0].params);
                      setCurStudent(res[0].student);
                      setCurSolution(res[0].solution);
                      setCurLanguage(res[0].language);
                      languageFuncChangeHandler(res[0].language);
                    });
                });
            });
        });
    }
  };

  const handleChange = (e, value) => {
    setCurQuestions(getNewQuestion());
    setCurPage(value);
    setCodeCur(curQuestions[value - 1].questionObj);
    setCurParams(curQuestions[value - 1].params);
    setCurStudent(curQuestions[value - 1].student);
    setCurSolution(curQuestions[value - 1].solution);
    setCurLanguage(curQuestions[value - 1].language);
    languageFuncChangeHandler(curQuestions[value - 1].language);
  };

  const handleAddQuestion = () => {
    if (curQuestions.length !== 0) {
      const newQuestion = curQuestions.map((item) => {
        return { ...item };
      }); // copy new object in question array

      newQuestion.push({
        id: "new",
        questionObj: "",
        params: "",
        student: "",
        solution: "",
        language: "",
      });
      newQuestion[curPage - 1].questionObj = codeCur;

      setCurQuestions(newQuestion);
      setPage(page + 1);
      setCurPage(page + 1);
      setCodeCur("");
      setCurParams("");
      setCurStudent("");
      setCurSolution("");
      setCurLanguage("");
      languageFuncChangeHandler("javascript");
    } else {
      const newQuestion = [
        {
          id: "new",
          questionObj: codeCur,
          params: curParams,
          student: curStudent,
          solution: curSolution,
          language: curLanguage,
        }, // there are 2 object because the one and the new one
        {
          id: "new",
          questionObj: "",
          params: "",
          student: "",
          solution: "",
          language: "",
        },
      ];
      setCurQuestions(newQuestion);
      setPage(page + 1);
      setCurPage(page + 1);
      setCodeCur("");
      setCurParams("");
      setCurStudent("");
      setCurSolution("");
      setCurLanguage("");
      languageFuncChangeHandler("javascript");
    }
  };

  const handleSave = async () => {
    if (curQuestions.length !== 0) {
      const newQuestion = getNewQuestion();

      dispatch(create({ newQuestion: newQuestion, QuizId: params.QuizId }))
        .unwrap()
        .then(() => {
          dispatch(getAllQuestions(params.QuizId))
            .unwrap()
            .then((res) => {
              setCurQuestions(res);
              setPage(res.length);
              setCodeCur(res[curPage - 1].questionObj);
              setCurParams(res[curPage - 1].params);
              setCurStudent(res[curPage - 1].student);
              setCurSolution(res[curPage - 1].solution);
              setCurLanguage(res[curPage - 1].language);
            });
        });
    } else {
      const newQuestion = [
        {
          id: "new",
          questionObj: codeCur,
          params: curParams,
          student: curStudent,
          solution: curSolution,
          language: curLanguage,
        },
      ];
      dispatch(create({ newQuestion: newQuestion, QuizId: params.QuizId }))
        .unwrap()
        .then((res) => {
          dispatch(getAllQuestions(params.QuizId))
            .unwrap()
            .then((res) => {
              setCurQuestions(res);
              setPage(res.length);
              setCodeCur(res[curPage - 1].questionObj);
              setCurParams(res[curPage - 1].params);
              setCurStudent(res[curPage - 1].student);
              setCurSolution(res[curPage - 1].solution);
              setCurLanguage(res[curPage - 1].language);
            });
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSolClickOpen = () => {
    setSolOpen(true);
  };

  const handleSolClose = () => {
    setTabIndex("1");
    setSolOpen(false);
  };

  // * try to understand useCallback and useMemo
  const changeHandler = useCallback((value) => {
    setCodeCur(value);
  }, []);

  const debouncedChangeHandler = useMemo(
    (value, viewUpdate) => debounce(changeHandler, 600),
    []
  );

  const paramsChangeHandler = useCallback((value) => {
    setCurParams(value);
  }, []);
  const studentChangeHandler = useCallback((value) => {
    setCurStudent(value);
  }, []);
  const solutionChangeHandler = useCallback((value) => {
    setCurSolution(value);
  }, []);

  const debounceParams = useMemo(
    (value, viewUpdate) => debounce(paramsChangeHandler, 600),
    []
  );
  const debounceStudent = useMemo(
    (value, viewUpdate) => debounce(studentChangeHandler, 600),
    []
  );
  const debounceSolution = useMemo(
    (value, viewUpdate) => debounce(solutionChangeHandler, 600),
    []
  );

  const linkDashboard = () => {
    dispatch(quizReset());
    dispatch(courseReset());
    dispatch(reset());

    navigate("/");
  };

  useEffect(() => {
    if (isIdle) {
      dispatch(getAllQuestions(params.QuizId)) // params.id -> QuizId
        .unwrap()
        .then((res) => {
          if (res.length !== 0) {
            setCurQuestions(res);
            setPage(res.length);
            if (res[0].language.length !== 0) {
              languageFuncChangeHandler(res[0].language);
            }
            setCodeCur(res[0].questionObj);
            if (res[0].params.length !== 0) {
              setCurParams(res[0].params);
            }
            if (res[0].student.length !== 0) {
              setCurStudent(res[0].student);
            }
            if (res[0].solution.length !== 0) {
              setCurSolution(res[0].solution);
            }
            if (res[0].language.length !== 0) {
              setCurLanguage(res[0].language);
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    // return () => {
    //   dispatch(reset());
    // };
  }, []);

  return (
    <div className='editor'>
      <div className='editor-title'>
        <Stack direction='row' spacing={1}>
          <Tooltip title='Home'>
            <IconButton aria-label='home' onClick={linkDashboard}>
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Button variant='outlined' size='small' onClick={handleSolClickOpen}>
            Solution
          </Button>

          <Dialog open={solOpen} maxWidth={false} onClose={handleSolClose}>
            <DialogTitle
              id='alert-dialog-title'
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>Solution</div>
              {console.log("curLanguage", curLanguage)}
              <FormControl style={{ width: "150px" }} size='small'>
                <InputLabel id='language-select-label'>Language</InputLabel>
                <Select
                  labelId='language-select-label'
                  id='language-select'
                  value={curLanguage}
                  label='Language'
                  onChange={curLanguageChange}
                >
                  <MenuItem value={"javascript"}>JavaScript</MenuItem>
                  <MenuItem value={"php"}>PHP</MenuItem>
                  <MenuItem value={"python"}>Python</MenuItem>
                </Select>
              </FormControl>
            </DialogTitle>

            <DialogContent style={{ outline: "none" }}>
              <Box>
                <TabContext value={tabIndex}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={tabIndexChange}
                      aria-label='lab API tabs example'
                    >
                      <Tab label='Params' value='1' />
                      <Tab label='Student answer' value='2' />
                      <Tab label='Solution ' value='3' />
                    </TabList>
                  </Box>
                  <TabPanel value='1'>
                    <CodeMirror
                      value={curParams}
                      extensions={[curLanguageFunc]}
                      onChange={debounceParams}
                      className='solution-editor'
                      theme='light'
                      // theme={githubLight}
                      autoFocus={true}
                    />
                  </TabPanel>
                  <TabPanel value='2'>
                    <CodeMirror
                      value={curStudent}
                      extensions={[curLanguageFunc]}
                      onChange={debounceStudent}
                      className='solution-editor'
                      theme='light'
                      // theme={githubLight}
                      autoFocus={true}
                    />
                  </TabPanel>
                  <TabPanel value='3'>
                    <CodeMirror
                      value={curSolution}
                      extensions={[curLanguageFunc]}
                      onChange={debounceSolution}
                      className='solution-editor'
                      theme='light'
                      // theme={githubLight}
                      autoFocus={true}
                    />
                  </TabPanel>
                </TabContext>
              </Box>
            </DialogContent>
          </Dialog>
        </Stack>
        {/* <h4 className='editor-title-label'>{quiz.name}</h4> */}
        <Stack direction='row' spacing={1}>
          <Tooltip title='Create'>
            <IconButton
              color='primary'
              aria-label='add a question'
              onClick={handleAddQuestion}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Save'>
            <IconButton
              color='primary'
              aria-label='Save a quiz'
              onClick={handleSave}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Delete'>
            <IconButton
              color='error'
              aria-label='Save a quiz'
              onClick={handleClickOpen}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </div>

      <div className='editor-container'>
        <CodeMirror
          value={codeCur}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={debouncedChangeHandler}
          height='100%'
          className='quiz-editor'
          theme={githubLight}
          autoFocus={true}
        />

        <MarkdownRenderer codeCur={codeCur} />
      </div>

      <Stack
        spacing={2}
        justifyContent='center'
        alignItems='center'
        sx={{ py: [1, 1] }}
      >
        <Pagination
          count={page}
          page={curPage}
          color='primary'
          onChange={handleChange}
        />
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Delete this question?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onDelete} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Question;

// delQ -> delete a question
// const newQuestion = [...curQuestions];
// newQuestion.splice(curPage - 1, 1);
// setCurPage(1);
// if (page === 1) {
//   newQuestion[0] = "";
//   setCurQuestions(newQuestion);
//   setCodeCur("");
// } else {
//   setCurQuestions(newQuestion);
//   setPage(page - 1);
//   setCodeCur(curQuestions[0]);
// }
