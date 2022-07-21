import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from "./questionService";

const initialState = {
  question: {},
  questions: [],
  isIdle: true,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const create = createAsyncThunk(
  "question/create",
  async (question, { rejectWithValue }) => {
    const response = await questionService.create(question, rejectWithValue);

    return response;
  }
);

export const createOne = createAsyncThunk(
  "question/createOne",
  async (QuizId, { rejectWithValue }) => {
    const response = await questionService.createOne(QuizId, rejectWithValue);

    return response;
  }
);

export const getAllQuestions = createAsyncThunk(
  "question/getAllQuestions",
  async (QuizId, { rejectWithValue }) => {
    const response = await questionService.getAllQuestions(
      QuizId,
      rejectWithValue
    );

    return response;
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    reset: () => initialState,
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.isSuccess = true;
      })
      .addCase(create.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createOne.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOne.fulfilled, (state, action) => {
        state.question = action.payload;
        state.isSuccess = true;
      })
      .addCase(createOne.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllQuestions.pending, (state) => {
        state.isIdle = false;
        state.isLoading = true;
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setQuestion } = questionSlice.actions;
export default questionSlice.reducer;
