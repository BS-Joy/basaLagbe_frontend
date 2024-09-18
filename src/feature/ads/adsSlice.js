import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ads: [],
  totalBookmarkedAds: 0,
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setAds: (state, action) => {
      state.ads = action.payload;
    },
    sortAds: (state, action) => {
      const { ads, sortType, originalState } = action.payload;
      let sortedAds = [...ads];
      switch (sortType) {
        case "name":
          sortedAds = sortedAds.sort((a, b) => a.title.localeCompare(b.title));
          state.ads = sortedAds;
          break;
        case "rent":
          sortedAds = sortedAds.sort((a, b) => Number(a.rent) - Number(b.rent));
          state.ads = sortedAds;
          break;
        case "date-posted":
          sortedAds = sortedAds.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          );
          state.ads = sortedAds;
          break;
        default:
          state.ads = originalState; // No sorting, default order
          break;
      }
    },
  },
});

export const getAdsSelector = (state) => state.ads.ads;

export const { setAds, sortAds } = adsSlice.actions;

export default adsSlice.reducer;
