import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '@my-monorepo/shared';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4200/api/' }),
  endpoints: build => ({
    getCategories: build.query<Category[], void>({
      query: () => 'categories'
    })
  })
});

export const { useGetCategoriesQuery } = categoryApi;
