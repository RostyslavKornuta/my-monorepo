import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Author } from '@my-monorepo/shared';

export const authorApi = createApi({
  reducerPath: 'authorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4200/api/' }),
  endpoints: build => ({
    getAuthors: build.query<Author[], void>({
      query: () => 'authors'
    })
  })
});

export const { useGetAuthorsQuery } = authorApi;
