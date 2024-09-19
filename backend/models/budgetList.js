import mongoose from "mongoose";

const budgetListSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Personal Care",
        "Dining",
        "Groceries",
        "Shopping",
        "Entertainment",
        "transportation",
        "Healthcare",
        "Bills",
        "Miscellaneous",
      ],
      required: true,
    },
    color: { type: String, required: true },
    currentAmount: { type: Number, required: true, default: 0 },
    targetAmount: { type: Number, required: true },
    freeAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
