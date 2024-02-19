import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import loaderSlice from "./features/loaderSlice";
import logger from "redux-logger";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    loading: loaderSlice,
    counter: counterSlice,
    user: userSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
