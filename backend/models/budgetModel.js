import mongoose from "mongoose";

const budgetSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    color: { type: String },
    currentAmount: { type: Number, default: 0 },
    targetAmount: { type: Number },
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

    transactionIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
