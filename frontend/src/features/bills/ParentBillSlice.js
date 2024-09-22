import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const getParentBillsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("ParentBills")) || [];
};

const initialState = {
  ParentBills: getParentBillsFromLocalStorage(),
};

const ParentBillsSlice = createSlice({
  name: "ParentBills",
  initialState,
  reducers: {
    createParentBills: (state, action) => {
   

      state.ParentBills = action.payload;

      localStorage.setItem("ParentBills", JSON.stringify(action.payload));
    },

    UpdateParentBills: (state, action) => {
      state.ParentBills = action.payload;

      localStorage.setItem("ParentBills", JSON.stringify(action.payload));
    },
  },
});

export const { createParentBills, UpdateParentBills } =
  ParentBillsSlice.actions;

export default ParentBillsSlice.reducer;
