import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("userInfo")) || null;
};

const initialState = {
  userInfo: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userInfo = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    logoutUser: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      toast.success("user removed successfully");
    },

    registerUser: (state, action) => {
      state.userInfo = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { loginUser, logoutUser, registerUser } = userSlice.actions;

export default userSlice.reducer;
