import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  LandingPage,
  BudgetsPage,
  HomeLayloutPage,
  LoginPage,
  PotsPage,
  RecurringbillsPage,
  RegisterPage,
  TransactionsPage,
} from "./Pages";
import { action as LoginAction } from "./Pages/Login";
import { action as RegisterAction } from "./Pages/Register";
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
        element: <PotsPage />,
      },
      {
        path: "recurring-bills",
        element: <RecurringbillsPage />,
      },
      { path: "transactions", element: <TransactionsPage /> },
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
