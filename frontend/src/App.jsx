import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  LandingPage,
  BudgetsPage,
  HomeLayloutPage,
  LoginPage,
Pots,
  RecurringbillsPage,
  RegisterPage,
  TransactionsPage,
  TransactiondetailedPage,
  Transaction,
  EditTransaction,
} from "./Pages";
import { action as LoginAction } from "./Pages/Login";
import { action as RegisterAction } from "./Pages/Register";
import { action as TransactionsAction } from "./Pages/Transactions";
import { loader as TransactionsLoader } from "./Pages/Transactions";
import { action as editTransactionAction } from "./Pages/EditTransactions";

import { loader as potsLoader } from "./Pages/Pots";
import { action as potAction } from "./Pages/Pots";
import { loader as TransactionsDetailsLoader } from "./Pages/TransactiondetailedPage";

import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayloutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "budgets",
        element: <BudgetsPage />,
      },
      {
        path: "pots",
        element: <Pots />,
        loader: potsLoader(store),
        action: potAction(store)
      },
      {
        path: "recurring-bills",
        element: <RecurringbillsPage />,
      },
      {
        path: "transactions",
        element: <Transaction />,

        children: [
          {
            index: true,
            element: <TransactionsPage />,
            loader: TransactionsLoader(store),
            action: TransactionsAction(store),
          },

          {
            path: ":id",
            element: <TransactiondetailedPage />,
            loader: TransactionsDetailsLoader(store),
          },
          {
            path: "edit/:id",
            element: <EditTransaction />,
            loader: TransactionsDetailsLoader(store),
            action: editTransactionAction(store),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <Error />,
    action: RegisterAction(store),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
