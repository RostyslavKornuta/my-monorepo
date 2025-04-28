import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Content } from '@my-monorepo/shared';

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4200/api/' }),
  endpoints: build => ({
    getContents: build.query<Content[], void>({
      query: () => 'contents'
    })
  })
});

export const { useGetContentsQuery } = contentApi;
