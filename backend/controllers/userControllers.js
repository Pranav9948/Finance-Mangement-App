import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import usersDB from "../models/userModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import budgetsDB from "../models/budgetModel.js";
import generateToken from "../utils/generateToken.js";
import potModel from "../models/potModel.js";
import UserModel from "../models/userModel.js";
import TransactionModel from "../models/transactionModel.js";
import {
  ParentRecurringBill,
  RecurringBill,
} from "../models/RecuringBillModel.js";

//  @desc  Auth User & Get Token
//  @routes POST api/users/login
// @ access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("pls fill all fields");
  }

  // check if email exist

  const userExist = await User.findOne({ email: email });

  if (userExist && (await userExist.matchPassword(password))) {
    await generateToken(res, userExist._id);

    return res.json({
      _id: userExist._id,
      email: userExist.email,
      username: userExist.username,
      currentBalance: userExist.currentBalance,
      income: userExist.income,
      expense: userExist.expense,
    });
  }

  res.status(401);
  res.json({ message: "invalid username and password" });
});

//  @desc   User Registration
//  @routes POST api/users/register
// @ access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("pls fill all fields");
  }

  const userExists = await usersDB.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await usersDB.create({
    username,
    email,
    password,
  });

  if (user) {
    const categories = budgetsDB.schema.path("category").enumValues;

    const budgetPromises = categories.map(async (category) => {
      const newBudget = new budgetsDB({
        userId: user._id,
        category: category,
      });

      return newBudget.save();
    });

    await Promise.all(budgetPromises);

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      currentBalance: user.currentBalance,
      income: user.income,
      expense: user.expense,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

//  @desc   get user Profile
//  @routes GET api/users/profile
// @ access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await usersDB.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//  @desc   update user Profile
//  @routes PUT api/users/profile
// @ access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getDataforHomePage = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const latestFourPots = await potModel
      .find({ userId })
      .sort({ createdAt: 1 })
      .limit(4);

    const latestFourTransactions = await TransactionModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const pots = await potModel.find({ userId });
    const sumOfSavedPots = pots.reduce((acc, pot) => acc + pot.savedAmount, 0);

    const budgets = await budgetsDB.find({ userId });

    const paidBills = await RecurringBill.find({
      userId: userId,
      paidStatus: "Paid",
    });

    const UnpaidBills = await RecurringBill.find({
      userId: userId,
      paidStatus: "Unpaid",
    });

    const OverdueBills = await RecurringBill.find({
      userId: userId,
      paidStatus: "Overdue",
    });

    const paidBillSum = paidBills.reduce((acc, bill) => acc + bill.amount, 0);

    const UnpaidBillsSum = UnpaidBills.reduce(
      (acc, bill) => acc + bill.amount,
      0
    );

    const OverdueBillSum = OverdueBills.reduce(
      (acc, bill) => acc + bill.amount,
      0
    );

    res.status(200).json({
      latestFourPots,
      sumOfSavedPots,
      latestFourTransactions,
      budgets,
      paidBillSum,
      UnpaidBillsSum,
      OverdueBillSum,
    });
  } catch (err) {
    throw new Error(err);
  }
});

export {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
  getDataforHomePage,
};
