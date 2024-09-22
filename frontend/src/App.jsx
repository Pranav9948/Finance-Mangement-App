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
  CreateBudgetsPage,
} from "./Pages";
import { action as LoginAction } from "./Pages/Login";
import { action as RegisterAction } from "./Pages/Register";
import { action as TransactionsAction } from "./Pages/Transactions";
import { loader as TransactionsLoader } from "./Pages/Transactions";
import { action as editTransactionAction } from "./Pages/EditTransactions";

import { loader as landingLoader } from "./Pages/Landing";
import { loader as potsLoader } from "./Pages/Pots";
import { loader as RecurringbillsLoader } from "./Pages/Recurringbills";
import { action as potAction } from "./Pages/Pots";
import { loader as TransactionsDetailsLoader } from "./Pages/TransactiondetailedPage";
import { action as RecurringbillsAction } from "./Pages/Recurringbills";
import { store } from "./store";

import { loader as BudgetsLoader } from "./Pages/Budgets";
import { loader as CreateBudgetsLoader } from "./Pages/CreateBudgetsPage";
import { action as CreateBudgetsAction } from "./Pages/CreateBudgetsPage";
import PrivateRoute from "./Components/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayloutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <LandingPage />
          </PrivateRoute>
        ),
        loader: landingLoader(store)
      },
      {
        path: "budgets",
        element: (
          <PrivateRoute>
            <BudgetsPage />
          </PrivateRoute>
        ),
        loader: BudgetsLoader(store),
      },

      {
        path: "createBudget",
        element: <CreateBudgetsPage />,
        loader: CreateBudgetsLoader(store),
        action: CreateBudgetsAction(store),
      },

      {
        path: "pots",
        element: (
          <PrivateRoute>
            <Pots />
          </PrivateRoute>
        ),
        loader: potsLoader(store),
        action: potAction(store),
      },
      {
        path: "recurring-bills",
        element: (
          <PrivateRoute>
            <RecurringbillsPage />
          </PrivateRoute>
        ),
        loader: RecurringbillsLoader(store),
        action: RecurringbillsAction(store),
      },
      {
        path: "transactions",
        element: (
          <PrivateRoute>
            <Transaction />
          </PrivateRoute>
        ),

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
