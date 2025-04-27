import {configureStore} from "@reduxjs/toolkit";
import {contentApi} from "./contentApi"; // strange
import {authorApi} from "./authorApi";
import { categoryApi } from './categoryApi'; // strange

export const store = configureStore({
  reducer: {
    [contentApi.reducerPath]: contentApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(contentApi.middleware, authorApi.middleware, categoryApi.middleware)
})
