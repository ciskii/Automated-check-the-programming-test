import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import courseReducer from "../features/course/courseSlice";
import quizReducer from "../features/quiz/quizSlice";
import questionReducer from "../features/question/questionSlice";
import answerReducer from "../features/answer/answerSlice";
import enrollmentReducer from "../features/enrollment/enrollmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    quiz: quizReducer,
    question: questionReducer,
    answer: answerReducer,
    enrollment: enrollmentReducer,
  },
});
