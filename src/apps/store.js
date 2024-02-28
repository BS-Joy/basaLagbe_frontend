import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../feature/api/apiSlice";
import userReducer from "../feature/user/userSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        user: userReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})