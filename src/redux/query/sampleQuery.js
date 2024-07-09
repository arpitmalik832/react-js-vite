import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from './baseQuery';

const sampleQuery = createApi({
  reducerPath: 'sampleQuery',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    fetchData: builder.query({
      query: ({ axiosInstance }) => ({
        axiosInstance,
        url: '/jokes',
      }),
      providesTags: ['fetchJokes'],
    }),
    updateData: builder.mutation({
      query: ({ axiosInstance }) => ({
        axiosInstance,
        url: '/jokes/update',
      }),
      invalidatesTags: ['fetchJokes'],
    }),
  }),
});

export const { useFetchDataQuery, useUpdateDataMutation } = sampleQuery;

export default sampleQuery;
