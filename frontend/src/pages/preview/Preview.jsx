import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MarkdownRenderer from "./MarkdownRenderer";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import CodeMirror from "@uiw/react-codemirror";

import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";

import { create, reset } from "features/answer/answerSlice";
import { getAllQuestions } from "features/question/questionSlice";
import { myTheme } from "utils/theme";
import "github-markdown-css";
import "./preview.css";

const Preview = () => {
  const [curCode, setCurCode] = useState(""); // current code at selected page
  const [curCodes, setCurCodes] = useState([]); // set of current code for each questions  array of obj. {QuestionObj, answerObj}
  const [curQuestion, setCurQuestion] = useState(""); //current question on selected page
  const [page, setPage] = useState(1); // total page number
  const [curPage, setCurPage] = useState(1); // current selected page

  const { isIdle, questions } = useSelector((state) => state.question); // Questions from teacher
  const { quiz } = useSelector((state) => state.quiz); // quiz obj.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleChangePage = (e, value) => {
    const newCodes = curCodes.map((item) => {
      return { ...item };
    });
    newCodes[curPage - 1].answerObj = curCode;
    setCurCodes(newCodes);

    setCurCode(curCodes[value - 1].answerObj);
    setCurPage(value);
    setCurQuestion(questions[value - 1].questionObj); // change question for new page
  };

  const handleSave = async () => {
    const savedAnswers = curCodes.map((item) => {
      return { ...item };
    });
    savedAnswers[curPage - 1].answerObj = curCode;

    dispatch(create(savedAnswers)).unwrap();
    // .then((res) => {
    //   dispatch(getAllQuestions(params.QuizId))
    //     .unwrap()
    //     .then((res) => {
    //       setCurQuestions(res);
    //       setPage(res.length);
    //       setCurCode(res[curPage - 1].questionObj);
    //     });
    // });
  };

  // * try to understand useCallback and useMemo
  const changeHandler = useCallback((value, viewUpdate) => {
    setCurCode(value);
  }, []);

  useEffect(() => {
    dispatch(getAllQuestions(params.QuizId)) // params.id -> QuizId
      .unwrap()
      .then((res) => {
        if (res.length !== 0) {
          const initialCodes = res.map((item) => {
            return {
              QuestionId: item.id, // question id
              answerObj: "",
            };
          }); // create default code for each question
          setCurCodes(initialCodes);
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

        <CodeMirror
          value={curCode}
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

export default Preview;
