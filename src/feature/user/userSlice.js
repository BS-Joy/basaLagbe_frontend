import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:8000/user"

export const signUpUser = createAsyncThunk();

export const logInUser = createAsyncThunk('/login', async(credentials) => {
    console.log('function called')
    const resposne = await axios.get(`${baseUrl}/login`, credentials);

    console.log(resposne)

    return resposne.data
});

export const fetchAllUSers = createAsyncThunk();

const initialState = {
    currentUser: null,
    status: "idle",
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(logInUser.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(logInUser.fulfilled, (state, action) => {
            state.status = 'succeeded',
            console.log(action.payload);
            state.currentUser = action.payload;
        })
        .addCase(logInUser.rejected, (state, action) => {
            state.status = 'failed'
            console.log(action.payload)
            state.error = action.payload
        })
    }
});

export const getCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;