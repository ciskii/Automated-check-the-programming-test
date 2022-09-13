import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { debounce } from "lodash";

import MarkdownRenderer from "./MarkdownRenderer";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { githubLight } from "@uiw/codemirror-theme-github";
import "katex/dist/katex.min.css";
import CodeMirror, { useCodeMirror } from "@uiw/react-codemirror";

// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/ext-language_tools";

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
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  create,
  getAllQuestions,
  reset,
} from "features/question/questionSlice";
// import { myTheme } from "utils/theme";
import "github-markdown-css";
import "./question.css";

const Question = () => {
  const [codeCur, setCodeCur] = useState(""); // current code at selected page
  const [page, setPage] = useState(1); // total page number
  const [curPage, setCurPage] = useState(1); // current selected page
  const [curQuestions, setCurQuestions] = useState([]); // current questions on client
  const [open, setOpen] = useState(false); // delete modal

  const { isIdle, questions } = useSelector((state) => state.question);
  const { quiz } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [solOpen, setSolOpen] = useState(false);
  const [solCode, setSolCode] = useState("");

  const getNewQuestion = () => {
    // ! what a step! HOLY
    const newQuestion = curQuestions.map((item) => {
      return { ...item };
    }); // copy new object in question array

    newQuestion[curPage - 1].questionObj = codeCur; // update selected page question to current code
    return newQuestion;
  };

  const handleChange = (e, value) => {
    setCurQuestions(getNewQuestion());
    setCurPage(value);
    setCodeCur(curQuestions[value - 1].questionObj);
  };

  const handleAddQuestion = () => {
    if (curQuestions.length !== 0) {
      const newQuestion = curQuestions.map((item) => {
        return { ...item };
      }); // copy new object in question array

      newQuestion.push({
        id: "new",
        questionObj: "",
      });
      newQuestion[curPage - 1].questionObj = codeCur;
      setCurQuestions(newQuestion);
      setPage(page + 1);
      setCurPage(page + 1);
      setCodeCur("");
    } else {
      const newQuestion = [
        {
          id: "new",
          questionObj: codeCur,
        }, // there are 2 object because the one and the new one
        {
          id: "new",
          questionObj: "",
        },
      ];
      setCurQuestions(newQuestion);
      setPage(page + 1);
      setCurPage(page + 1);
      setCodeCur("");
    }
  };

  // todo
  const delQ = () => {
    // delQ -> delete a question
    const newQuestion = [...curQuestions];
    newQuestion.splice(curPage - 1, 1);
    setCurPage(1);

    if (page === 1) {
      newQuestion[0] = "";
      setCurQuestions(newQuestion);
      setCodeCur("");
    } else {
      setCurQuestions(newQuestion);
      setPage(page - 1);
      setCodeCur(curQuestions[0]);
    }
  };

  const handleSave = async () => {
    if (curQuestions.length !== 0) {
      const newQuestion = curQuestions.map((item) => {
        return { ...item };
      });

      newQuestion[curPage - 1].questionObj = codeCur;
      dispatch(create({ newQuestion: newQuestion, QuizId: params.QuizId }))
        .unwrap()
        .then((res) => {
          dispatch(getAllQuestions(params.QuizId))
            .unwrap()
            .then((res) => {
              setCurQuestions(res);
              setPage(res.length);
              setCodeCur(res[curPage - 1].questionObj);
            });
        });
    } else {
      const newQuestion = [
        {
          id: "new",
          questionObj: codeCur,
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

  const solChangeHandler = useCallback((value) => {
    setSolCode(value);
  }, []);
  const debounceSolChangeHandler = useMemo(
    (value, viewUpdate) => debounce(solChangeHandler, 600),
    []
  );

  const [age, setAge] = React.useState("");

  const languageChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllQuestions(params.QuizId)) // params.id -> QuizId
      .unwrap()
      .then((res) => {
        if (res.length !== 0) {
          setCurQuestions(res);
          setPage(res.length);
          setCodeCur(res[0].questionObj);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <div className='editor'>
      <div className='editor-title'>
        <Stack direction='row' spacing={1}>
          <Link to='/'>
            <Tooltip title='Home'>
              <IconButton aria-label='home'>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Link>

          <Button variant='outlined' size='small' onClick={handleSolClickOpen}>
            Solution
          </Button>

          <Dialog
            open={solOpen}
            maxWidth={false}
            onClose={handleSolClose}
            // style={{ height: "500px" }}
          >
            <DialogTitle id='alert-dialog-title'>Solution</DialogTitle>

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Age</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={age}
                label='Age'
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <DialogContent style={{ outline: "none" }}>
              <CodeMirror
                value={solCode}
                extensions={[
                  markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                  }),
                ]}
                onChange={debounceSolChangeHandler}
                className='solution-editor'
                theme={githubLight}
                autoFocus={true}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSolClose}>Cancel</Button>
              <Button
                onClick={(e) => {
                  handleSolClose();
                }}
                autoFocus
                color='error'
              >
                Save
              </Button>
            </DialogActions>
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

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            Delete this question?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={(e) => {
                handleClose();
                delQ();
              }}
              autoFocus
              color='error'
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
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
    </div>
  );
};

export default Question;
