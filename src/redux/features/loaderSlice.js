import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const loaderSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
