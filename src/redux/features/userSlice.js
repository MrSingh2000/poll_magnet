import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  authToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state = {
        userId: action.payload.userId,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
      };
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
