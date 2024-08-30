import mongoose from "mongoose";

const budgetSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String, required: true },
    maximum: { type: Number, required: true },
    theme: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Budget  = mongoose.model("Budget", budgetSchema);

export default Budget;
