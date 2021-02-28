import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userType: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user = action.payload.user;
    },
    setUserLogoutState: (state) => {
      state.user = null;
    },
    setUserType: (state, action) => {
      state.userType = action.payload.userType;
    },
    setUserTypeNull: (state) => {
      state.userType = null;
    },
  },
});

export const {
  setActiveUser,
  setUserLogoutState,
  setUserType,
  setUserTypeNull,
} = userSlice.actions;

export const selectUserName = (state) => state.user.userName;
export const selectUser = (state) => state.user.user;
export const selectUserType = (state) => state.user.userType;
export default userSlice.reducer;
