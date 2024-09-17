import asyncHandler from "../middleware/asyncHandler.js";
import potModel from "../models/potModel.js";
import UserModel from "../models/userModel.js";
import TransactionModel from "../models/transactionModel.js";

// create new pot

export const createNewPot = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];

  const { color, targetAmount, name, savedAmount, percentageSaved } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const newPot = new potModel({
      color: `${color}`,
      targetAmount,
      name,
      savedAmount,
      percentageSaved,
      userId,
    });

    await newPot.save();

    res.status(200).json({ newPot, user });
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

export const addMoney = asyncHandler(async (req, res) => {
  console.log("req.header", req.headers["user-id"]);

  const userId = req.headers["user-id"];

  const potId = req.params.id.trim();

  const savedAmount = req.body.addedMoneyAmount;

  console.log("potid, userid", potId, userId);
  console.log("req.body", req.body);

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    console.log(
      "user.currentBalance",
      user.currentBalance,
     Number(savedAmount)
    );
    

    if (user.currentBalance >= Number(savedAmount)) {
      const pot = await potModel.findById(potId);

      pot.savedAmount += Number(savedAmount);

      const savedPercentage = ((pot.savedAmount / pot.targetAmount) * 100).toFixed(2);

      console.log("saved", savedPercentage);

      pot.percentageSaved = savedPercentage;

      user.currentBalance -= Number(savedAmount);
      user.expense += Number(savedAmount);

      await pot.save();
      await user.save();

      // Create a transaction when adding money to the pot

      const transaction = new TransactionModel({
        userId: userId,
        image:
          "https://plus.unsplash.com/premium_photo-1677207979103-180962cfb05e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: `Added to pot: ${pot.name}`,
        category: "Pot Savings",
        type: "Debit",
        amount: savedAmount,
        date: new Date(),
      });

      await transaction.save();

      res.status(201).json({ pot, user, transaction });
    } else {
      res.status(400).json({ message: "Insufficent Balance" });
    }
  } catch (err) {
    throw new Error(err);
  }
});

export const withDrawMoney = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];


  const potId = req.params.id.trim();

  console.log("id mann", potId);

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 

    const pot = await potModel.findById(potId);
    console.log('potte',pot);
    

    user.currentBalance += Number(pot.savedAmount);
    user.income += Number(pot.savedAmount);

    const deletedPot = await potModel.findByIdAndDelete(potId);

    await user.save();

    // Create a transaction when adding money to the pot

    const transaction = new TransactionModel({
      userId: userId,
      image:
        "https://plus.unsplash.com/premium_photo-1677207979103-180962cfb05e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: `Added to pot: ${pot.name}`,
      category: "Pot Savings",
      type: "Credit",
      amount: Number(pot.savedAmount),
      date: new Date(),
    });

    await transaction.save();

    res.status(201).json({ user, pot, transaction });
  }
  
  catch (err) {
    throw new Error(err);
  }
});

export const getAllPots = asyncHandler(async (req, res) => {
  const userId = req.headers["user-id"];

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allPots = await potModel.find({ userId });

    res.status(200).json(allPots);
  } catch (err) {
    throw new Error(err);
  }
});
