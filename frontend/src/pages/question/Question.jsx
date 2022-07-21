import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create, reset } from "features/question/questionSlice";
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
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { myTheme, code } from "./theme";
import "./question.css";
import "github-markdown-css";

const Question = () => {
  const [codeCur, setCodeCur] = useState(code);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const { quiz } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const handleChange = (e, value) => {
    const newQ = [...questions]; // newQ -> new question
    newQ[curPage - 1] = codeCur;
    setQuestions(newQ);
    setCurPage(value);
    setCodeCur(questions[value - 1]);
  };

  const handleAddQuestion = () => {
    const newQ = [...questions];
    newQ[curPage - 1] = codeCur;
    setQuestions(newQ);
    setPage(page + 1);
    setCurPage(page + 1);
    setCodeCur("");
  };

  const delQ = () => {
    // delQ -> delete a question
    const newQ = [...questions];
    newQ.splice(curPage - 1, 1);

    setCurPage(1);
    if (page === 1) {
      newQ[0] = "";
      setQuestions(newQ);
      setCodeCur("");
    } else {
      setQuestions(newQ);
      setPage(page - 1);
      setCodeCur(questions[0]);
    }
  };

  const handleSave = () => {
    const newQ = [...questions]; // newQ -> new question
    newQ[curPage - 1] = codeCur;
    dispatch(create({ newQ: newQ, QuizId: quiz.id }));
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
