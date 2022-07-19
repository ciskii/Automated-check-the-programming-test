import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "./courseService";

const initialState = {
  course: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const create = createAsyncThunk(
  "course/create",
  async (course, { rejectWithValue }) => {
    const response = await courseService.create(course, rejectWithValue);

    return response;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    reset: (state) => {
      state.course = null;
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
        state.course = action.payload;
        state.isSuccess = true;
      })
      .addCase(create.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
