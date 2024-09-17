import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const getTransactionsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("transactions")) || [];
};

const initialState = {
  transactions: getTransactionsFromLocalStorage(),
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    listAllTransactions: (state, action) => {
      state.transactions = action.payload;
      localStorage.setItem("transactions", JSON.stringify(action.payload));
    },

    createNewtransaction: (state, action) => {
      state.transactions.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },

    editTransaction: (state, action) => {
      const Index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );

      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },

    deleteTransactions: async (state, action) => {
      state.transactions = state.transactions.filter(
        (item) => item._id !== action.payload
      );

        localStorage.setItem(
          "transactions",
          JSON.stringify(state.transactions)
        );
    
    },

    sortAscendingTransaction: (state, action) => {
      state.transactions = state.transactions.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    },

    sortDescendingTransaction: (state, action) => {
      state.transactions = JSON.parse(localStorage.getItem("transactions"));
    },

    getAllTransactions: (state, action) => {
      state.transactions = JSON.parse(localStorage.getItem("transactions"));
    },

    getAllDebitTransactions: (state, action) => {
      const DebitTransaction = JSON.parse(localStorage.getItem("transactions"));

      state.transactions = DebitTransaction.filter(
        (transaction) => transaction.type === "Debit"
      );
    },

    getAllCreditTransactions: (state, action) => {
      const creditTransaction = JSON.parse(
        localStorage.getItem("transactions")
      );

      state.transactions = creditTransaction.filter(
        (transaction) => transaction.type === "Credit"
      );
    },

    searchTransactions: (state, action) => {
      if (action.payload === "") {
        state.transactions = JSON.parse(localStorage.getItem("transactions"));
      } else {
        const searchedTransactions = state.transactions.filter((item) => {
          if (item.name.toLowerCase().includes(action.payload.toLowerCase())) {
            return item;
          }
        });

        state.transactions = searchedTransactions;
      }
    },
  },
});

export const {
  createNewtransaction,
  deleteTransactions,
  editTransaction,
  listAllTransactions,
  sortAscendingTransaction,
  sortDescendingTransaction,
  getAllTransactions,
  getAllCreditTransactions,
  getAllDebitTransactions,
  searchTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
