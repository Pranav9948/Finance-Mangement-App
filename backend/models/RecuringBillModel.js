import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Recurring Bill Schema
const recurringBillSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Utilities", "Rent", "Subscriptions", "Loans", "Insurance", "Other"],
    required: true,
  },
  dueDay: {
    type: Number,
    required: true,
  },

  frequency: {
    type: String,
    enum: ["Monthly", "Quarterly", "Yearly"],
    required: true,
  },
  paidStatus: {
    type: String,
    enum: ["Paid", "Unpaid", "Overdue"],
    required: true,
  },
});

// Parent Schema for Recurring Bills
const parentRecurringBillSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalBillsAmount: {
    type: Number,
    default: 0,
  },
  paidBillsAmount: {
    type: Number,
    default: 0,
  },
  totalUpcomingBills: {
    type: Number,
    default: 0,
  },
  dueSoonBills: {
    type: Number,
    default: 0,
  },
  // This field could be an array of bill IDs or references to RecurringBill documents
  billIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecurringBill",
    },
  ],
});

const RecurringBill = mongoose.model("RecurringBill", recurringBillSchema);
const ParentRecurringBill = mongoose.model(
  "ParentRecurringBill",
  parentRecurringBillSchema
);

export { RecurringBill, ParentRecurringBill };
