/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["ads", "category"],
  endpoints: (builder) => ({
    getAds: builder.query({
      query: (arg) => {
        const { cat, queryParams } = arg;

        const query = queryParams
          ? JSON.stringify(queryParams).toString()
          : null;

        return {
          url: `/ads/getAds/${cat}?searchParams=${query}`,
        };
      },
      providesTags: (result) =>
        result?.length
          ? [
              { type: "ads", id: "LIST" },
              ...result?.map((ad) => ({ type: "ads", id: ad?._id })),
            ]
          : [{ type: "ads", id: "LIST" }],
    }),
    postAds: builder.mutation({
      query: (newAd) => ({
        url: "/ads",
        method: "POST",
        body: newAd,
      }),
      invalidatesTags: [
        { type: "ads", id: "LIST" },
        { type: "ads", id: "AUTHOR" },
      ],
    }),
    getAdsByAuthor: builder.query({
      query: (authorId) => `/ads/author/${authorId}`,
      providesTags: (result) =>
        result?.length
          ? [
              { type: "ads", id: "AUTHOR" },
              ...result?.map((ad) => ({ type: "ads", id: ad?._id })),
            ]
          : [{ type: "ads", id: "AUTHOR" }],
    }),
    getAdsById: builder.query({
      query: (adId) => `/ads/${adId}`,
      providesTags: (result) =>
        result
          ? [
              { type: "ads", id: "adId" },
              { type: "ads", id: result?._id },
            ]
          : [{ type: "ads", id: "adId" }],
    }),
    deleteAd: builder.mutation({
      query: ({ adId }) => ({
        url: `/ads/${adId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "ads", id: arg?.adId }],
    }),
    updateAd: builder.mutation({
      query: (adToUpdate) => ({
        url: `/ads/${adToUpdate?._id}`,
        method: "PATCH",
        body: adToUpdate,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ads", id: "LIST" },
        { type: "ads", id: arg?._id },
      ],
    }),
    getCategories: builder.query({
      query: () => "/category",
    }),
  }),
});

export const {
  usePostAdsMutation,
  useGetAdsQuery,
  useGetAdsByAuthorQuery,
  useGetAdsByIdQuery,
  useDeleteAdMutation,
  useUpdateAdMutation,
  useGetCategoriesQuery,
} = apiSlice;
