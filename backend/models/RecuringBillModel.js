import mongoose from "mongoose";

const recuringBillSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, required: true }, // e.g., "Monthly", "Weekly"
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
  },
  {
    timestamps: true,
  }
);

const RecurringBill = mongoose.model("RecurringBill", recuringBillSchema);

export default RecurringBill;
