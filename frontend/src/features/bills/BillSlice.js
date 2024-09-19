import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const getBillsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("Bills")) || [];
};

const initialState = {
  bills: getBillsFromLocalStorage(),
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    listAllBills: (state, action) => {
      state.bills = action.payload;
      localStorage.setItem("bills", JSON.stringify(action.payload));
    },

    createNewBills: (state, action) => {
      state.bills.push(action.payload);
      localStorage.setItem("bills", JSON.stringify(state.bills));
    },

    updateBills: (state, action) => {
      console.log("action.payload", action.payload);

      const Index = state.bills.findIndex(
        (bill) => bill._id === action.payload._id
      );

      if (Index !== -1) {
        state.bills[Index] = action.payload;
      }
    },

    searchBills: (state, action) => {
      if (action.payload === "") {
        state.bills = JSON.parse(localStorage.getItem("bills"));
      } else {
        const searchedBills = state.bills.filter((item) => {
          if (item.title.toLowerCase().includes(action.payload.toLowerCase())) {
            return item;
          }
        });

        state.bills = searchedBills;
      }
    },
  },
});

export const { createNewBills, listAllBills, updateBills ,searchBills} = billsSlice.actions;

export default billsSlice.reducer;
