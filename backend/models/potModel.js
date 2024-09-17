import mongoose from "mongoose";

const potSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    targetAmount: {
      type: Number,
      required: true,
    },

    savedAmount: {
      type: Number,
      required: true,
    },
    percentageSaved: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pot = mongoose.model("Pot", potSchema);

export default Pot;
