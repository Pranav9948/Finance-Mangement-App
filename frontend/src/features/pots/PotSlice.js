import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const getPotsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("pots")) || [];
};

const initialState = {
  pots: getPotsFromLocalStorage(),
};

const potsSlice = createSlice({
  name: "pot",
  initialState,
  reducers: {
    listAllPots: (state, action) => {
      state.pots = action.payload;

      console.log("state", state.pots);

      localStorage.setItem("pots", JSON.stringify(action.payload));
    },

    createNewPot: (state, action) => {
      state.pots.push(action.payload);
      localStorage.setItem("pots", JSON.stringify(state.pots));
    },

    addMoneyToPot: (state, action) => {
      const Index = state.pots.findIndex(
        (pot) => pot._id === action.payload._id
      );

      if (Index !== -1) {
        state.pots[Index] = action.payload;
      }
    },

    withdrawMoneyFromPot: (state, action) => {
      if (state.pots.length === 1) {
        setTimeout(() => {
          state.pots = [];
        }, 2000);
      } else {
        state.pots = state.pots.filter((item) => item._id !== action.payload);
      }

      localStorage.setItem("pots", JSON.stringify(state.pots));
    },
  },
});

export const {
  listAllPots,
  withdrawMoneyFromPot,
  addMoneyToPot,
  createNewPot,
} = potsSlice.actions;

export default potsSlice.reducer;
