import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";

const initialState = {
  quiz: {
    id: "",
    quizId: "",
    name: "",
  },
  quizzes: [],
  isIdle: true,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const create = createAsyncThunk(
  "quiz/create",
  async (quiz, { rejectWithValue }) => {
    const response = await quizService.create(quiz, rejectWithValue);

    return response;
  }
);

export const getAllQuizzes = createAsyncThunk(
  "quiz/getAllQuizzes",
  async (quiz, { rejectWithValue }) => {
    const response = await quizService.getAllQuizzes(quiz, rejectWithValue);

    return response;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    reset: (state) => {
      state.course = null;
      state.courses = [];
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.isSuccess = true;
      })
      .addCase(create.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllQuizzes.pending, (state) => {
        state.isIdle = false;
        state.isLoading = true;
      })
      .addCase(getAllQuizzes.fulfilled, (state, action) => {
        state.quizzes = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllQuizzes.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = quizSlice.actions;
export default quizSlice.reducer;
