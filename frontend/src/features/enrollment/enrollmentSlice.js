import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enrollmentService from "./enrollmentService";

const initialState = {
  course: {},
  courses: [],
  isIdle: true,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const enrollCourse = createAsyncThunk(
  "enrollment/enrollCourse",
  async (course, { rejectWithValue }) => {
    const response = await enrollmentService.enrollCourse(
      course,
      rejectWithValue
    );

    return response;
  }
);

export const getAllCourses = createAsyncThunk(
  "enrollment/getAllCourses",
  async (course, { rejectWithValue }) => {
    const response = await courseService.getAllCourses(course, rejectWithValue);

    return response;
  }
);

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    reset: () => initialState,
    setCourse: (state, action) => {
      state.course = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enrollCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.course = action.payload;
        state.isSuccess = true;
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
    // .addCase(getAllCourses.pending, (state) => {
    //   state.isIdle = false;
    //   state.isLoading = true;
    // })
    // .addCase(getAllCourses.fulfilled, (state, action) => {
    //   state.courses = action.payload;
    //   state.isSuccess = true;
    // })
    // .addCase(getAllCourses.rejected, (state, action) => {
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

export const { reset, setCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
