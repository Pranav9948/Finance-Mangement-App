import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import budgetsDB from "../models/budgetModel.js";

const getAllBudgets = asyncHandler(async (req, res) => {
  throw new Error("budget never exist");
  const allBudgets = await budgetsDB.find({});

  res.status(200).json({ allBudgets });
});

const getSingleBudget = asyncHandler(async (req, res) => {
  // Validate the id format using Mongoose's isValid method
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid budget ID format");
  }

  const singleBudget = await budgetsDB.findById(req.params.id);

  if (singleBudget) {
    return res.json(singleBudget);
  }

  res.status(404);

  throw new Error("budget never exist");
});

export { getAllBudgets, getSingleBudget };
