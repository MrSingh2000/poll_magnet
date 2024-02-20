import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // id from firestore
  userId: "",
  authToken: "",
  refreshToken: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log("action: ", action);
      const { userId, authToken, refreshToken, email } = action.payload;
      state.userId = userId;
      state.authToken = authToken;
      state.refreshToken = refreshToken;
      state.email = email;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
