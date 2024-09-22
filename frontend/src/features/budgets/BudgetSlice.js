import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const getBudgetsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("budgets")) || [];
};

const initialState = {
  budgets: getBudgetsFromLocalStorage(),
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    listAllBudgets: (state, action) => {
      state.budgets = action.payload;

   

      localStorage.setItem("budgets", JSON.stringify(action.payload));
    },

    createNewbudget: (state, action) => {
      state.budgets.push(action.payload);
      localStorage.setItem("budgets", JSON.stringify(state.budgets));
    },

    updatebudget: (state, action) => {
      const Index = state.budgets.findIndex(
        (budget) => budget._id === action.payload._id
      );

      if (Index !== -1) {
        state.budgets[Index] = action.payload;
      }
    },
  },
});

export const { createNewbudget, listAllBudgets, updatebudget } =
  budgetSlice.actions;

export default budgetSlice.reducer;
