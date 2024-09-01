import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: false,
  },
  reducers: {
    loginOrRegister: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
    },
    logoutOrSignout: (state, action) => {
      state.user = {};
    },
  },
});

export const { loginOrRegister, logoutOrSignout } = userSlice.actions;
export default userSlice.reducer;
