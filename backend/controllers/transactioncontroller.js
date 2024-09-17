import asyncHandler from "../middleware/asyncHandler.js";
import TransactionModel from "../models/transactionModel.js";
import UserModel from "../models/userModel.js";

export const getCategories = asyncHandler(async (req, res) => {
  try {
    // Extract the enum values from the schema
    console.log("mannn");

    const categories = TransactionModel.schema.path("category").enumValues;

    res.status(200).json(categories);
  } catch (err) {
    throw new Error(err);
  }
});

export const createNewTransaction = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];
  const { image, name, category, type, amount, date } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const transaction = new TransactionModel({
      userId,
      image,
      name,
      category,
      type,
      amount,
      date: date ? new Date(date) : new Date(),
    });

    if (type === "Credit") {
      user.currentBalance += Number(amount);
      user.income += Number(amount);
      await transaction.save();
    } else if (type === "Debit") {
      if (user.currentBalance >= amount) {
        user.currentBalance -= Number(amount);
        user.expense += Number(amount);
        await transaction.save();
      } else {
        await user.save();

        var messages = true;
      }
    }

    if (messages) {
      await user.save();

      res
        .status(201)
        .json({ transaction, user, message: "Insufficent Balance" });
    } else {
      await user.save();
      res.status(201).json({ transaction, user });
    }
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

export const editTransaction = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];

  const transactionId = req.params.id.trim();

  const { image, name, category, type, amount, date } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transaction = await TransactionModel.findById(transactionId);

    // Adjust balance based on the previous transaction type before updating
    if (transaction.type === "Credit") {
      user.currentBalance -= transaction.amount;
      user.income -= transaction.amount;
    } else if (transaction.type === "Debit") {
      user.currentBalance += transaction.amount;
      user.expense -= transaction.amount;
    }

    // Update transaction details
    transaction.image = image || transaction.image;
    transaction.name = name || transaction.name;
    transaction.category = category || transaction.category;
    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.date = date ? new Date(date) : transaction.date;

    await transaction.save();

    // Update balance based on the new transaction type
    if (transaction.type === "Credit") {
      user.currentBalance += transaction.amount;
      user.income += transaction.amount;
    } else if (transaction.type === "Debit") {
      if (user.currentBalance >= transaction.amount) {
        user.currentBalance -= transaction.amount;
        user.expense += transaction.amount;
      } else {
        user.currentBalance -= transaction.amount;
        user.expense += transaction.amount;
      }
    }

    await user.save();

    res.status(200).json({ transaction, user });
  } catch (err) {
    throw new Error(err);
  }
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];
  console.log(req.params);

  const id = req.params.id.trim();

  console.log("id mann", id);

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transaction = await TransactionModel.findById(id);
    console.log("transaction", transaction);

    if (transaction) {
      // Adjust balance based on the transaction type before deleting
      if (transaction.type === "Credit") {
        user.currentBalance -= transaction.amount;
        user.income -= transaction.amount;
      } else if (transaction.type === "Debit") {
        user.currentBalance += transaction.amount;
        user.expense -= transaction.amount;
      }

      await user.save();
      await TransactionModel.findByIdAndDelete(id);
    }

    res.status(200).json(user);
  } catch (err) {
    throw new Error(err);
  }
});

export const listAllTransactions = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transactions = await TransactionModel.find({ userId }).sort({
      createdAt: -1,
    }); // Sort by date, latest first

    res.status(200).json(transactions);
  } catch (err) {
    throw new Error(err);
  }
});

export const getSingleTransaction = asyncHandler(async (req, res) => {
  const id = req.params.id.trim();
  try {
    const transaction = await TransactionModel.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json(transaction);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});
