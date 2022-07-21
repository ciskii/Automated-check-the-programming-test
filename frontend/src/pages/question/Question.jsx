import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { debounce } from "lodash";

import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import "katex/dist/katex.min.css";
import CodeMirror from "@uiw/react-codemirror";

import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import {
  create,
  createOne,
  getAllQuestions,
  reset,
} from "features/question/questionSlice";
import { myTheme, code } from "./theme";
import "./question.css";
import "github-markdown-css";

const Question = () => {
  const [codeCur, setCodeCur] = useState(""); // current code at selected page
  const [open, setOpen] = useState(false); // delete modal
  const [page, setPage] = useState(1); // total page number
  const [curPage, setCurPage] = useState(1); // current selected page
  const [curQuestions, setCurQuestions] = useState([]); // current questions on client
  const { isIdle, questions } = useSelector((state) => state.question);
  const { quiz } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

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

  // todo
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

  // todo
  // 2 cases know when call getAllQuestions
  // - if questions.length == 0
  //   save :
  //   add :
  //
  // - if questions.length >= 1
  //   add :
  //  ? call createOne api
  //  ? or add new one to current questions array
  //    -> when save let backend check if this question have no question id yet then create a new one and update an exist question
  //

  const handleSave = () => {
    const newQuestion = curQuestions.map((item) => {
      return { ...item };
    });

    newQuestion[curPage - 1].questionObj = codeCur;
    console.log("newQuestion", newQuestion);
    dispatch(create({ newQuestion: newQuestion, QuizId: quiz.id }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // * try to understand useCallback and useMemo
  const changeHandler = useCallback((value, viewUpdate) => {
    setCodeCur(value);
  }, []);

  const debouncedChangeHandler = useMemo(
    (value, viewUpdate) => debounce(changeHandler, 300),
    []
  );

  useEffect(() => {
    if (isIdle) {
      dispatch(getAllQuestions(quiz.id))
        .unwrap()
        .then((res) => {
          console.log("res", res);
          // array of questions object ->
          // QuizId, questionObj, id
          if (res.length !== 0) {
            setCurQuestions(res);
            setPage(res.length);
            setCodeCur(res[0].questionObj);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);

  return (
    <div className='editor'>
      <div className='editor-title'>
        <div className='editor-title-label'>
          <p>DOCUMENT NAME</p>
        </div>

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
          extensions={[markdown({ base: markdownLanguage })]}
          onChange={debouncedChangeHandler}
          height='100%'
          theme={myTheme}
          className='quiz-editor'
        />

        <ReactMarkdown
          className='editor-show markdown-body'
          children={codeCur}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={githubGist}
                  PreTag='div'
                  showLineNumbers={true}
                  wrapLines={true}
                  wrapLongLines={true}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
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
