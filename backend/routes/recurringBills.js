import express from "express";
import asyncHandler from "../middleware/errorMiddleware.js";
import budgetsDB from "../models/budgetModel.js";
import {
  getAllRecurringBills,
  getSingleRecurringBills,
} from "../controllers/potController.js";

const router = express.Router();

router.route("/").get(getAllRecurringBills);

router.route("/:id").get(getSingleRecurringBills);

export default router;
