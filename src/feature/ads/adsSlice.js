import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const adsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.rent - a.rent,
    selectId: ad => ad._id
});

export const initialState = adsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAds: builder.query({
            query: () => '/ads',
            transformResponse: response => {
                return adsAdapter.setAll(initialState, response);
            },
            transformErrorResponse: response => {
                return response;
            },
            // eslint-disable-next-line no-unused-vars
            providesTags: (result) => [
                { type: 'ads', id: "LIST" },
                ...result.ids.map(id => ({ type: 'ads', id }))
            ]
        }),
        postAds: builder.mutation({
            query: newAd => ({
                url: '/ads',
                method: 'POST',
                body: newAd
            }),
            invalidatesTags: [{type: 'ads', id: "LIST"}],
        })
    })
});

export const {usePostAdsMutation, useGetAdsQuery} = extendedApiSlice;

const selectAdsResult = extendedApiSlice.endpoints.getAds.select();

const selectAdsData = createSelector(
    selectAdsResult, (adsResult) => {
        return adsResult.data;
    }
)


export const {
    selectAll: selectAllAds,
    selectIds: selectAdsIds,
    selectById: selectAdsById
} = adsAdapter.getSelectors(state => selectAdsData(state) ?? initialState)