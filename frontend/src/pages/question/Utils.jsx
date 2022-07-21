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

const Utils = (props) => {
  const [codeCur, setCodeCur] = useState(code);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [questions, setQuestions] = useState([]);
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
    // dispatch(create(questions))
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
        <DialogTitle id='alert-dialog-title'>Delete this question?</DialogTitle>
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

export default Utils;
