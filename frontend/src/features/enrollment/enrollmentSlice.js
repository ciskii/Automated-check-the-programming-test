import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enrollmentService from "./enrollmentService";

const initialState = {
  course: {},
  enrolledStudents: [],
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

export const getEnrolledStudents = createAsyncThunk(
  "enrollment/getEnrolledStudents",
  async (CourseId, { rejectWithValue }) => {
    const response = await enrollmentService.getEnrolledStudents(
      CourseId,
      rejectWithValue
    );

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
      })
      .addCase(getEnrolledStudents.pending, (state) => {
        state.isIdle = false;
        state.isLoading = true;
      })
      .addCase(getEnrolledStudents.fulfilled, (state, action) => {
        state.enrolledStudents = action.payload;
        state.isSuccess = true;
      })
      .addCase(getEnrolledStudents.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
