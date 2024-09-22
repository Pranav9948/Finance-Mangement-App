import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import budgetsDB from "../models/budgetModel.js";
import UserModel from "../models/userModel.js";

const getAllBudgets = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];


  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const budgets = await budgetsDB
      .find({ userId })
      .populate({
        path: "transactionIds",
        select: "name amount date",
      })
      .exec();

    res.status(200).json(budgets);
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

const updateBudget = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];
  

  const { formdata } = req.body;
  const { color, targetAmount, currentAmount, category } = formdata;

  if (!color || !targetAmount || !category) {
    res.status(400);
    throw new Error("pls fill all fields");
  }



  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const categoryBudget = await budgetsDB.findOne({ category, userId });

    categoryBudget.targetAmount = targetAmount || categoryBudget.targetAmount;
    categoryBudget.currentAmount =
      currentAmount || categoryBudget.currentAmount;
    categoryBudget.color = color || categoryBudget.color;

    await categoryBudget.save();

    res.status(200).json(categoryBudget);
  } catch (err) {
    res.status(400);
    console.log("err", err);

    throw new Error(err);
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = budgetsDB.schema.path("category").enumValues;

    res.status(200).json(categories);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllSetBudgets = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];


  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const budgets = await budgetsDB.find({
      userId,
      targetAmount: { $exists: false },
    });

  

    res.status(200).json(budgets);
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

export { getAllBudgets, updateBudget, getCategories, getAllSetBudgets };
