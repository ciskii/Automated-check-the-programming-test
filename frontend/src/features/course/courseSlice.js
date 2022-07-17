import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "./courseService";

const initialState = {
  course: null,
  isSuccess: false,
  isError: false,
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
      state.stateisError = false;
      state.message = "";
    },
  },
});

export default courseSlice.reducer;
