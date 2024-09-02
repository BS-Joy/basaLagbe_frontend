import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAds: builder.query({
      query: () => "/ads",
      transformResponse: (res) =>
        res?.toSorted((a, b) => Number(a.rent) - Number(b.rent)),
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
      invalidatesTags: (result, error, arg) => [{ type: "ads", id: arg?._id }],
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
} = extendedApiSlice;
