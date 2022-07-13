import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { useDispatch } from "react-redux";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedIn: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    const response = await authService.login(user, rejectWithValue);

    return response;
  }
);

export const signup = createAsyncThunk("auth/signup", async (user) => {
  const response = await authService.signup(user);
  return response;
});

export const isLoggedIn = createAsyncThunk("auth/isLoggedIn", async (user) => {
  const response = await authService.isLoggedIn();
  return response;
});

export const logout = createAsyncThunk("auth/logout", async (user) => {
  const response = await authService.logout();
  return response;
});

export const getMe = createAsyncThunk("auth/getMe", async (user) => {
  const response = await authService.getMe();
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLoggedIn = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("action", action);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMe.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
