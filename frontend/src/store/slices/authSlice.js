import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

// Make sure the login action is storing the complete user object
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user; // Make sure this includes _id
      state.role = action.payload.user.role;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.role = null;
      state.user = null;
      localStorage.clear();
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    }
  }
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;