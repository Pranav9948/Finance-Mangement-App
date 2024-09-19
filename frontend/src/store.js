import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/users/userSlice";
import transactionsReducer from "./features/transactions/TransactionSlice";
import potReducer from "./features/pots/PotSlice";
import billReducer from "./features/bills/BillSlice";
import ParentBillsReducer from "./features/bills/ParentBillSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    transactionState: transactionsReducer,
    potState: potReducer,
    billState: billReducer,
    parentBillsState: ParentBillsReducer,
  },
});
