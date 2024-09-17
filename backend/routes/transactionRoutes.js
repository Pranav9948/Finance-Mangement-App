import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import budgetsDB from "../models/budgetModel.js";
import {
  createNewTransaction,
  getCategories,
  deleteTransaction,
  editTransaction,
  listAllTransactions,
  getSingleTransaction,
} from "../controllers/transactioncontroller.js";

const router = express.Router();

   

router.route('/').post(createNewTransaction).get(listAllTransactions)
router.route("/getcategories").get(getCategories);
router 
  .route("/:id")
  .get(getSingleTransaction)
  .delete(deleteTransaction)
  .put(editTransaction);




export default router;
