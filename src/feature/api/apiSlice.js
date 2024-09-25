/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["ads", "category", "bookmark"],
  endpoints: (builder) => ({
    getAds: builder.query({
      query: (arg) => {
        const { cat, queryParams, currentPage: page } = arg;

        const query = queryParams
          ? JSON.stringify(queryParams).toString()
          : null;

        return {
          url: `/ads/getAds/${cat}?searchParams=${query}&page=${page}`,
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
    getRecentAds: builder.query({
      query: () => "/ads/recentAds",
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
        { type: "category" },
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
      invalidatesTags: (result, error, arg) => [
        { type: "ads", id: arg?.adId },
        { type: "category" },
      ],
    }),
    updateAd: builder.mutation({
      query: (adToUpdate) => ({
        url: `/ads`,
        method: "PATCH",
        body: adToUpdate,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ads", id: "LIST" },
        { type: "ads", id: arg?._id },
        { type: "category" },
      ],
    }),
    getCategories: builder.query({
      query: () => "/category",
      providesTags: (result) => [{ type: "category" }],
    }),
    updateAdsActiveStatus: builder.mutation({
      query: (adData) => ({
        url: `/ads/${adData?.adId}`,
        method: "PATCH",
        body: adData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ads", id: "LIST" },
        { type: "ads", id: arg?._id },
        { type: "category" },
        "bookmark",
      ],
    }),
    addToBookmark: builder.mutation({
      query: ({ userId, adId }) => ({
        url: `/bookmark/${userId}`,
        method: "PUT",
        body: { adId },
      }),
      invalidatesTags: () => ["bookmark"],
    }),
    checkBookmarkStatus: builder.query({
      query: ({ userId, adId }) => `/bookmark/${userId}/${adId}`,
      providesTags: (result) => ["bookmark"],
    }),
    getBookmarksByUser: builder.query({
      query: (userId) => `/bookmark/${userId}`,
      providesTags: (result) => ["bookmark"],
    }),
    deleteBookmark: builder.mutation({
      query: ({ userId, adId }) => ({
        url: `/bookmark/${userId}`,
        method: "DELETE",
        body: { adId },
      }),
      invalidatesTags: () => ["bookmark"],
    }),
  }),
});

export const {
  usePostAdsMutation,
  useGetAdsQuery,
  useGetRecentAdsQuery,
  useGetAdsByAuthorQuery,
  useGetAdsByIdQuery,
  useDeleteAdMutation,
  useUpdateAdMutation,
  useGetCategoriesQuery,
  useUpdateAdsActiveStatusMutation,
  useAddToBookmarkMutation,
  useCheckBookmarkStatusQuery,
  useGetBookmarksByUserQuery,
  useDeleteBookmarkMutation,
} = apiSlice;
