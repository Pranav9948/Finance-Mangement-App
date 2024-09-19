import asyncHandler from "../middleware/asyncHandler.js";
import {
  ParentRecurringBill,
  RecurringBill,
} from "../models/RecuringBillModel.js";
import TransactionModel from "../models/transactionModel.js";

import UserModel from "../models/userModel.js";

export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = RecurringBill.schema.path("category").enumValues;

    res.status(200).json(categories);
  } catch (err) {
    throw new Error(err);
  }
});

/* Calculates the number of days until the due date.*/

const calculateDaysUntilDue = (dueDateObj) => {
  const today = new Date();
  return Math.floor((dueDateObj - today) / (1000 * 60 * 60 * 24));
};

/* Updates the ParentRecurringBill document based on the new bill.*/

const updateParentBill = (parentBill, newBill) => {
  const dueDateObj = new Date(newBill.dueDate);
  const daysUntilDue = calculateDaysUntilDue(dueDateObj);

  parentBill.totalBillsAmount += Number(newBill.amount);

  if (dueDateObj >= new Date()) {
    parentBill.totalUpcomingBills += 1;
  }

  console.log("daysUntilDue", daysUntilDue);

  if (0 <= daysUntilDue && daysUntilDue < 7) {
    parentBill.dueSoonBills += 1;
  }
};

export const createBill = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];

    const { image, title, date, amount, category, frequency, paidStatus } =
      req.body;

    let dueDate = date;

    let currentDay = new Date();
    let DuesDay = new Date(dueDate);

    let Difference_In_Time = DuesDay.getTime() - currentDay.getTime();

    let dueDay = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    let billPaidStatus = paidStatus;
    if (dueDay < 0) {
      billPaidStatus = "Overdue";
    }

    const newBill = new RecurringBill({
      userId,
      image,
      title,
      dueDate,
      amount,
      category,
      frequency,
      paidStatus: billPaidStatus,
      dueDay,
    });

    const savedBill = await newBill.save();

    console.log("saved", savedBill);

    let parentBill = await ParentRecurringBill.findOne({ userId });

    if (!parentBill) {
      parentBill = new ParentRecurringBill({
        userId,
        totalBillsAmount: 0,
        paidBillsAmount: 0,
        totalUpcomingBills: 0,
        dueSoonBills: 0,
        billIds: [savedBill._id],
      });

      updateParentBill(parentBill, savedBill);
    } else {
      // Update existing ParentRecurringBill document
      updateParentBill(parentBill, savedBill);
      parentBill.billIds.push(savedBill._id);
    }

    await parentBill.save();

    res.status(201).json({
      message:
        "Recurring bill created and parent document updated successfully.",
      bill: savedBill,
    });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getBills = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const parentRecurringBill = await ParentRecurringBill.find({ userId });

    const recurringBill = await RecurringBill.find({ userId });

    res.status(201).json({ parentRecurringBill, recurringBill });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const makePayment = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    console.log("userId", userId);

    const user = await UserModel.findById(userId);

    const id = req.params.id.trim();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const parentRecurringBill = await ParentRecurringBill.findOne({ userId });

    const recurringBill = await RecurringBill.findById(id);

    console.log("recurring Bill", recurringBill);

    if (!recurringBill && !parentRecurringBill) {
      res.status(400).json({ message: "Bill not found..." });
    }

    recurringBill.paidStatus = "Paid";

    await recurringBill.save();

    // Create a transaction when adding money to the pot

    const transaction = new TransactionModel({
      userId: userId,
      image:
        "https://plus.unsplash.com/premium_photo-1678891133915-2a5f0fbc7aaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlsbHN8ZW58MHx8MHx8fDA%3D",
      name: `Bill Paid: ${recurringBill.title}`,
      category: "Bills",
      type: "Debit",
      amount: Number(recurringBill.amount),
      date: new Date(),
    });

    await transaction.save();

    if (user.currentBalance < Number(recurringBill.amount)) {
      return res.status(400).json({ message: "Insufficent Balance" });
    } else {
      user.currentBalance -= Number(recurringBill.amount);
      user.expense += Number(recurringBill.amount);
      await user.save();

      parentRecurringBill.totalBillsAmount -= Number(recurringBill.amount);
      parentRecurringBill.paidBillsAmount += 1;

      parentRecurringBill.totalUpcomingBills -= 1;

      if (parentRecurringBill.dueSoonBills >= 1) {
        parentRecurringBill.dueSoonBills -= 1;
      }
      await parentRecurringBill.save();

      res
        .status(201)
        .json({ parentRecurringBill, recurringBill, user, transaction });
    }
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



export const getAllPaidBills = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    console.log("userId", userId);

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const paidBills = await RecurringBill.find({
      userId: userId,
      paidStatus: "Paid",
    });

    if (!paidBills.length) {
      return res.status(404).json({ message: "No unpaid bills found" });
    }

    res.status(200).json({ paidBills });
  } catch (error) {
    console.error("Error fetching paid bills:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export const getAllUnPaidBills = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    console.log("userId", userId);

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const unpaidBills = await RecurringBill.find({
      userId: userId,
      paidStatus: "Unpaid",
    });

    if (!unpaidBills.length) {
      return res.status(404).json({ message: "No unpaid bills found" });
    }

    res.status(200).json({ unpaidBills });
  } catch (error) {
    console.error("Error fetching unpaid bills:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export const getAllOverdueBills = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    console.log("userId", userId);

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const OverdueBills = await RecurringBill.find({
      userId: userId,
      paidStatus: "Overdue",
    });

    if (!OverdueBills.length) {
      return res.status(404).json({ message: "No Overdue bills found" });
    }

    res.status(200).json({ OverdueBills });
  } catch (error) {
    console.error("Error fetching OverdueBills bills:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export const getUnPaidBillsinSevenDays = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    console.log("userId", userId);

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const unpaidBills = await RecurringBill.find({
      userId: userId,
      paidStatus: "Unpaid",
      dueDay: { $lte: 7 },
    });

    if (!unpaidBills.length) {
      return res.status(404).json({ message: "No unpaid bills found" });
    }

    res.status(200).json({ unpaidBills });
  } catch (error) {
    console.error("Error fetching unpaid bills:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export const getUnPaidBillsinFourteenDays = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    console.log("userId", userId);

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const unpaidBills = await RecurringBill.find({
      userId: userId,
      paidStatus: "Unpaid",
      dueDay: { $gt: 7, $lte: 14 },
    });

    if (!unpaidBills.length) {
      return res.status(404).json({ message: "No unpaid bills found" });
    }

    res.status(200).json({ unpaidBills });
  } catch (error) {
    console.error("Error fetching unpaid bills:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export const getUnPaidBillsinThirteenDays = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    console.log("userId", userId);

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const unpaidBills = await RecurringBill.find({
      userId: userId,
      paidStatus: "Unpaid",
      dueDay: { $gt: 14, $lte: 30 },
    });

    if (!unpaidBills.length) {
      return res.status(404).json({ message: "No unpaid bills found" });
    }

    res.status(200).json({ unpaidBills });
  } catch (error) {
    console.error("Error fetching unpaid bills:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});