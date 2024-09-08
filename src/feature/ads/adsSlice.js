import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ads: [],
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    getAds: (state, action) => {
      state.ads = action.payload;
    },
  },
});

export const adsSelector = (state) => state.ads.ads;

export const { getAds } = adsSlice.actions;

export default adsSlice.reducer;
