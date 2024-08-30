import express from "express";
import asyncHandler from "../middleware/errorMiddleware.js";
import budgetsDB from "../models/budgetModel.js";
import {
  getAllTransactions,
  getSingleTransactions,
} from "../controllers/transactioncontroller.js";

const router = express.Router();

router.route("/").get(getAllTransactions);

router.route("/:id").get(getSingleTransactions);

export default router;
