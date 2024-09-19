import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import budgetsDB from "../models/budgetModel.js";
import UserModel from "../models/userModel.js";

const getAllBudgets = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];
  console.log("userID", userId);

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

    console.log("budgets", budgets);

    res.status(200).json(budgets);
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

const createBudget = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];
  console.log("userID", userId, req.body);

  const { formdata } = req.body;
  const { color, targetAmount, category } = formdata;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const categoryExist = await budgetsDB.findOne({ category: category });
    if (categoryExist) {
      res.status(404);
      throw new Error("category already exist ");
    }

    const newBudget = new budgetsDB({
      userId,
      color,
      targetAmount,
      category,
      currentAmount: 0,
      transactionIds: [],
    });

    await newBudget.save();

    res.status(200).json(newBudget);
  } catch (err) {
    res.status(400);
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

export { getAllBudgets, createBudget, getCategories };
