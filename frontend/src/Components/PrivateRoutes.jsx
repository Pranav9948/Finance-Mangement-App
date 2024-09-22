import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { customFetch } from "../utils";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userState);
  const bills = useSelector((state) => state.billState.bills) || [];
  const transactions =
    useSelector((state) => state.transactionState.transactions) || [];
  const budgets = useSelector((state) => state.budgetState.budgets) || [];

  const [budgetLeft, setBudgetLeft] = useState(0);


    const getBudgetLeft = async () => {
      try {
        const { data } = await customFetch.get(
          "/budgets/getSetBudget",

          { headers: { "user-id": userId } }
        );


        setBudgetLeft(data.length);
      } catch (err) {
        console.log(err);
      }
    };

  
  useEffect(() => {
    getBudgetLeft();
  }, [budgetLeft]);


  const userId = userInfo?._id;

  if (!userInfo || !userInfo.username) {
    return <Navigate to="/login" replace />;
  } else if (bills.length > 0 || transactions.length > 0 || budgetLeft === 0) {
    return children;
  }

 




  // If logged in, render the child components
  return <Navigate to="/createBudget" replace />;
};

export default PrivateRoute;
