import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MarkdownRenderer from "./MarkdownRenderer";
import CodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";

import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";

import { reset as quizReset } from "features/quiz/quizSlice";
import { reset as courseReset } from "features/course/courseSlice";
import { create, reset as answerReset } from "features/answer/answerSlice";
import {
  getAllQuestions,
  reset as questionReset,
} from "features/question/questionSlice";
import { myTheme } from "utils/theme";
import "github-markdown-css";
import "./answer.css";

const Answer = () => {
  const [curCode, setCurCode] = useState(""); // current code at selected page
  const [curCodes, setCurCodes] = useState([]); // set of current code for each questions  array of obj. {QuestionObj, answerObj}
  const [curQuestion, setCurQuestion] = useState(""); //current question on selected page
  const [page, setPage] = useState(1); // total page number
  const [curPage, setCurPage] = useState(1); // current selected page

  const [curParams, setCurParams] = useState("");
  const [curStudent, setCurStudent] = useState("");
  const [curSolution, setCurSolution] = useState("");
  const [curLanguage, setCurLanguage] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { isIdle, questions } = useSelector((state) => state.question); // Questions from teacher
  const { quiz } = useSelector((state) => state.quiz); // quiz obj.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetAll = () => {
    dispatch(quizReset());
    dispatch(courseReset());
    dispatch(answerReset());
    dispatch(questionReset());
  };

  const handleChangePage = (e, value) => {
    const newCodes = curCodes.map((item) => {
      return { ...item };
    });
    newCodes[curPage - 1].answerObj = curCode;
    setCurCodes(newCodes);

    setCurCode(curCodes[value - 1].answerObj);
    setCurPage(value);
    setCurQuestion(questions[value - 1].questionObj); // change question for new page
    setCurLanguage(questions[value - 1].language);
  };

  const handleSave = () => {
    const savedAnswersObj = curCodes.map((item) => {
      return { ...item };
    });
    savedAnswersObj[curPage - 1].answerObj = curCode;

    // console.table(savedAnswersObj);

    //  * merge params, student'answer and solution together  //
    const mergeAnswers = savedAnswersObj.map((item) => {
      item["mergeAnswer"] =
        item.params + "\n" + item.answerObj + "\n" + item.solution;
      // console.log('item["mergeAnswer"]', item["mergeAnswer"]);
      return item;
    });

    console.log("savedAnswersObj", savedAnswersObj);

    const savedAnswers = {
      id: user.id,
      savedAnswersObj: mergeAnswers,
      QuizId: quiz.id,
    };

    dispatch(create(savedAnswers));
    resetAll();
    navigate("/", { replace: true });
  };

  // * try to understand useCallback and useMemo
  const changeHandler = useCallback((value, viewUpdate) => {
    setCurCode(value);
  }, []);

  const linkDashboard = () => {
    resetAll();
    navigate("/");
  };

  useEffect(() => {
    if (!quiz.id) {
      resetAll();
      navigate("/", { replace: true });
    } else if (isIdle) {
      // dispatch(getAllQuestions(params.QuizId)) // params.id -> QuizId
      dispatch(getAllQuestions(quiz.id)) // use quiz.id instead to prevent student to access quiz directly through the params
        .unwrap()
        .then((res) => {
          if (res.length !== 0) {
            // console.table(res);
            const initialCodes = res.map((item) => {
              return {
                QuestionId: item.id, // question id
                params: item.params,
                solution: item.solution,
                answerObj: item.student,
                language: item.language,
                questionNumber: item.questionNumber,
              };
            }); // create default code for each question
            setCurCodes(initialCodes);
            setCurCode(initialCodes[0].answerObj);
            setCurQuestion(res[0].questionObj);
            setCurLanguage(res[0].language);
            setPage(res.length);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    // return () => {
    //   dispatch(quizReset());
    //   dispatch(courseReset());
    // };
  }, []);

  return (
    <div className='editor'>
      <div className='editor-title'>
        <Stack direction='row' sx={{ flex: 1 }} spacing={1}>
          <Tooltip title='Home'>
            <IconButton aria-label='home' onClick={linkDashboard}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <h4 className='editor-title-label'>{quiz.name}</h4>
        </Stack>

        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ flex: 1 }}
          spacing={10}
        >
          <h4 className='editor-title-label'>{curLanguage}</h4>
          <IconButton
            color='primary'
            aria-label='Save a quiz'
            onClick={handleSave}
          >
            <SaveIcon />
          </IconButton>
        </Stack>
      </div>

      <div className='editor-container'>
        <MarkdownRenderer question={curQuestion} />

        <CodeMirror
          value={curCode}
          extensions={[javascript()]}
          onChange={changeHandler}
          height='100%'
          theme={githubLight}
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
