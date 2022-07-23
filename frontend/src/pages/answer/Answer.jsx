import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

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
import HomeIcon from "@mui/icons-material/Home";
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
import { myTheme } from "./theme";
import "github-markdown-css";
import "./answer.css";

const MarkdownRenderer = React.memo((markdownQuestion) => {
  return (
    <ReactMarkdown
      className='editor-show markdown-body'
      children={markdownQuestion.question}
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
  );
});

const Answer = () => {
  const [codeCur, setCodeCur] = useState(""); // current code at selected page
  const [curQuestion, setCurQuestion] = useState(""); //current question on that page
  const [page, setPage] = useState(1); // total page number
  const [curPage, setCurPage] = useState(1); // current selected page
  const { isIdle, questions } = useSelector((state) => state.question);
  const { quiz } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleChangePage = (e, value) => {
    setCurPage(value);
    setCurQuestion(questions[value - 1].questionObj); // single question
  };

  const handleSave = async () => {
    // if (curQuestions.length !== 0) {
    //   const newQuestion = curQuestions.map((item) => {
    //     return { ...item };
    //   });
    //   newQuestion[curPage - 1].questionObj = codeCur;
    //   dispatch(create({ newQuestion: newQuestion, QuizId: params.QuizId }))
    //     .unwrap()
    //     .then((res) => {
    //       dispatch(getAllQuestions(params.QuizId))
    //         .unwrap()
    //         .then((res) => {
    //           setCurQuestions(res);
    //           setPage(res.length);
    //           setCodeCur(res[curPage - 1].questionObj);
    //         });
    //     });
    // } else {
    //   const newQuestion = [
    //     {
    //       id: "new",
    //       questionObj: codeCur,
    //     },
    //   ];
    //   dispatch(create({ newQuestion: newQuestion, QuizId: params.QuizId }))
    //     .unwrap()
    //     .then((res) => {
    //       console.log("res", res);
    //       dispatch(getAllQuestions(params.QuizId))
    //         .unwrap()
    //         .then((res) => {
    //           setCurQuestions(res);
    //           setPage(res.length);
    //           setCodeCur(res[curPage - 1].questionObj);
    //         });
    //     });
    // }
  };

  // * try to understand useCallback and useMemo
  const changeHandler = useCallback((value, viewUpdate) => {
    setCodeCur(value);
  }, []);

  // dont need these
  const debouncedChangeHandler = useMemo((value, viewUpdate) => {
    debounce(changeHandler, 300);
  }, []);

  useEffect(() => {
    dispatch(getAllQuestions(params.QuizId)) // params.id -> QuizId
      .unwrap()
      .then((res) => {
        if (res.length !== 0) {
          setCurQuestion(res[0].questionObj);
          setPage(res.length);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
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
        </Stack>
        <h4 className='editor-title-label'>{quiz.name}</h4>
        <Stack direction='row' spacing={1}>
          <Tooltip title='Save'>
            <IconButton
              color='primary'
              aria-label='Save a quiz'
              onClick={handleSave}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </div>

      <div className='editor-container'>
        <MarkdownRenderer question={curQuestion} />
        {/* <ReactMarkdown
          className='editor-show markdown-body'
          children={delayedMarkdown}
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
        /> */}

        <CodeMirror
          value={codeCur}
          extensions={[markdown({ base: markdownLanguage })]}
          onChange={changeHandler}
          height='100%'
          theme={myTheme}
          className='quiz-editor'
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
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
};

export default Answer;
