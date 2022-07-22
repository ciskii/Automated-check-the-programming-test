import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isIdle: true,
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

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue }) => {
    const response = await authService.signup(user, rejectWithValue);
    return response;
  }
);

export const checkLoggedIn = createAsyncThunk(
  "auth/checkLoggedIn",
  async (user) => {
    const response = await authService.checkLoggedIn();
    return response;
  }
);

export const logout = createAsyncThunk("auth/logout", async (user) => {
  const response = await authService.logout();
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
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
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkLoggedIn.pending, (state, action) => {
        state.isIdle = false;
      })
      .addCase(checkLoggedIn.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(checkLoggedIn.rejected, (state, action) => {
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoggedIn = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
