import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // id from firestore
  userId: "",
  authToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log("action: ", action);
      const { userId, authToken, refreshToken } = action.payload;
      state.userId = userId;
      state.authToken = authToken;
      state.refreshToken = refreshToken;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
