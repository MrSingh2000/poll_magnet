import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import loaderSlice from "./features/loaderSlice";

export const store = configureStore({
  reducer: {
    loading: loaderSlice,
    counter: counterSlice,
  },
});
