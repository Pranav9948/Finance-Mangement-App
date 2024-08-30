import mongoose from "mongoose";

const potSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    target: { type: Number, required: true },
    total: { type: Number, required: true, default: 0 },
    theme: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Pot = mongoose.model("Pot", potSchema);

export default Pot;
