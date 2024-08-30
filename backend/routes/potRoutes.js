import express from "express";
import asyncHandler from "../middleware/errorMiddleware.js";
import budgetsDB from "../models/budgetModel.js";
import {
  getAllPots,
  getSinglePots,
} from "../controllers/potController.js";

const router = express.Router();

router.route("/").get(getAllPots);

router.route("/:id").get(getSinglePots);

export default router;
