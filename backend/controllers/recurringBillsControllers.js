import asyncHandler from "../middleware/asyncHandler.js";
import {
  ParentRecurringBill,
  RecurringBill,
} from "../models/RecuringBillModel.js";

import UserModel from "../models/userModel.js";

/* Calculates the number of days until the due date.*/

const calculateDaysUntilDue = (dueDateObj) => {
  const today = new Date();
  return Math.floor((dueDateObj - today) / (1000 * 60 * 60 * 24));
};

/* Updates the ParentRecurringBill document based on the new bill.*/

const updateParentBill = (parentBill, newBill) => {
  const dueDateObj = new Date(newBill.dueDate);
  const daysUntilDue = calculateDaysUntilDue(dueDateObj);

  parentBill.totalBillsAmount += newBill.amount;

  if (dueDateObj >= new Date()) {
    parentBill.totalUpcomingBills += 1;
  }

  if (daysUntilDue <= 7) {
    parentBill.dueSoonBills += 1;
  }
};

export const createBill = asyncHandler(async (req, res) => {
  try {
    const userId = req.headers["user-id"];

    const { image, title, dueDate, amount, category, frequency, paidStatus } =
      req.body;

    let currentDay = new Date();
    let DuesDay = new Date(dueDate);

    let Difference_In_Time = DuesDay.getTime() - currentDay.getTime();

    let dueDay = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  

    const newBill = new RecurringBill({
      userId,
      image,
      title,
      dueDate,
      amount,
      category,
      frequency,
      paidStatus,
      dueDay,
    });

    const savedBill = await newBill.save();

    let parentBill = await ParentRecurringBill.findOne({ userId });

    if (!parentBill) {
      parentBill = new ParentRecurringBill({
        userId,
        totalBillsAmount: savedBill.amount,
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
