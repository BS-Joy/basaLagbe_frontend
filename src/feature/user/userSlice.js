import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;

export const signUpUser = createAsyncThunk(
  "/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/user`, userData);

      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response?.data?.error || err?.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  "/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const resposne = await axios.post(`${baseUrl}/user/login`, credentials);
      return resposne.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || err?.message);
    }
  }
);

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("auth")) || null,
  status: "idle",
  error: null,
  ads: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem("auth");
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        localStorage.setItem("auth", JSON.stringify(action.payload));
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // signup
      .addCase(signUpUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const getCurrentUser = (state) => state.user.currentUser;
export const getStatus = (state) => state.user.status;
export const getError = (state) => state.user.error;
export const { logOut, setUserError } = userSlice.actions;

export default userSlice.reducer;
