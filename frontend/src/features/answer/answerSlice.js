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

// export const getAllQuestions = createAsyncThunk(
//   "answer/getAllQuestions",
//   async (QuizId, { rejectWithValue }) => {
//     const response = await answerService.getAllQuestions(
//       QuizId,
//       rejectWithValue
//     );

//     return response;
//   }
// );

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
      });
    // .addCase(getAllQuestions.pending, (state) => {
    //   state.isIdle = false;
    //   state.isLoading = true;
    // })
    // .addCase(getAllQuestions.fulfilled, (state, action) => {
    //   state.answers = action.payload;
    //   state.isSuccess = true;
    // })
    // .addCase(getAllQuestions.rejected, (state, action) => {
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

export const { reset, setQuestion } = answerSlice.actions;
export default answerSlice.reducer;
