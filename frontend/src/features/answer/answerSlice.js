import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import answerService from "./answerService";

const initialState = {
  answer: {},
  answers: [],
  isIdle: true,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const create = createAsyncThunk(
  "answer/create",
  async (answers, { rejectWithValue }) => {
    const response = await answerService.create(answers, rejectWithValue);

    return response;
  }
);

export const provideScore = createAsyncThunk(
  "answer/provideScore",
  async (answers, { rejectWithValue }) => {
    const response = await answerService.provideScore(answers, rejectWithValue);

    return response;
  }
);

export const getAllAnswers = createAsyncThunk(
  "answer/getAllAnswers",
  async (ids, { rejectWithValue }) => {
    const response = await answerService.getAllAnswers(ids, rejectWithValue);

    return response;
  }
);

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    reset: () => initialState,
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.answers = action.payload;
        state.isSuccess = true;
      })
      .addCase(create.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(provideScore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(provideScore.fulfilled, (state, action) => {
        state.answers = action.payload;
        state.isSuccess = true;
      })
      .addCase(provideScore.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllAnswers.pending, (state) => {
        state.isIdle = false;
        state.isLoading = true;
      })
      .addCase(getAllAnswers.fulfilled, (state, action) => {
        state.answers = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllAnswers.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setAnswer } = answerSlice.actions;
export default answerSlice.reducer;
