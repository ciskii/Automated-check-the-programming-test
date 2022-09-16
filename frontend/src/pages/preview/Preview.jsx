import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MarkdownRenderer from "./MarkdownRenderer";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

import { myTheme } from "utils/theme";
import {
  provideScore,
  getAllAnswers,
  reset,
} from "features/answer/answerSlice";
import {
  getAllQuestions,
  reset as questionReset,
} from "features/question/questionSlice";
import { reset as quizReset } from "features/quiz/quizSlice";
import { reset as courseReset } from "features/course/courseSlice";
import "github-markdown-css";
import "./preview.css";
import { scrollPastEnd } from "@codemirror/view";

const Preview = () => {
  const [curCode, setCurCode] = useState(""); // current code at selected page
  const [curCodes, setCurCodes] = useState([]); // set of current code for each questions  array of obj. {QuestionObj, answerObj}
  const [curQuestion, setCurQuestion] = useState(""); //current question on selected page
  const [page, setPage] = useState(1); // total page number
  const [curPage, setCurPage] = useState(1); // current selected page
  const [curScore, setCurScore] = useState(0);

  const { user } = useSelector((state) => state.auth);
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
    setCurScore(curCodes[value - 1].score);
    setCurCode(curCodes[value - 1].answerObj);
    setCurPage(value);
    setCurQuestion(questions[value - 1].questionObj); // change question for new page
  };

  const handleSave = async () => {
    const savedAnswers = curCodes.map((item) => {
      return { ...item };
    });
    savedAnswers[curPage - 1].answerObj = curCode;

    dispatch(provideScore(savedAnswers))
      .unwrap()
      .then((res) => navigate("/", { replace: true }));

    // dispatch(create(savedAnswers))
    //   .unwrap()
    //   .then((res) => {
    //     dispatch(getAllQuestions(params.QuizId))
    //       .unwrap()
    //       .then((res) => {
    //         setCurQuestions(res);
    //         setPage(res.length);
    //         setCurCode(res[curPage - 1].questionObj);
    //       });
    //   });
  };

  // * try to understand useCallback and useMemo
  const changeHandler = useCallback((value, viewUpdate) => {
    setCurCode(value);
  }, []);

  const scoreChangeHandler = (e) => {
    const newScores = curCodes.map((item) => {
      return { ...item };
    });

    newScores[curPage - 1].score = e.target.value;
    setCurScore(e.target.value);
    setCurCodes(newScores);
  };

  const linkDashboard = () => {
    dispatch(quizReset());
    dispatch(courseReset());
    dispatch(questionReset());

    navigate("/");
  };

  useEffect(() => {
    dispatch(getAllQuestions(params.QuizId))
      .unwrap()
      .then((resQuestions) => {
        if (resQuestions.length !== 0) {
          let questionIds = [];
          resQuestions.forEach((item) => {
            questionIds.push(item.id);
          });
          setCurQuestion(resQuestions[0].questionObj);
          setPage(resQuestions.length);

          // todo check if there's no answer
          dispatch(
            getAllAnswers({
              questionIds: questionIds,
              StudentId: params.StudentId,
            })
          )
            .unwrap()
            .then((resAnswers) => {
              if (resAnswers.length !== 0) {
                setCurCode(resAnswers[0].answerObj);
                setCurScore(resAnswers[0].score);
                setCurCodes(resAnswers);
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className='editor'>
      <div className='editor-title' style={{ justifyContent: "flex-start" }}>
        <Stack direction='row' spacing={1} sx={{ flex: "1" }}>
          <Tooltip title='Home'>
            <IconButton aria-label='home' onClick={linkDashboard}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <h4 className='editor-title-label'>{quiz.name}</h4>
        </Stack>
        <Stack direction='row' spacing={1}>
          <TextField
            value={curScore}
            onChange={scoreChangeHandler}
            id='outlined-basic'
            label='Score'
            color='warning'
            variant='outlined'
            sx={{
              width: 1,
            }}
            size='small'
            focused
          />

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
          extensions={[javascript()]}
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
