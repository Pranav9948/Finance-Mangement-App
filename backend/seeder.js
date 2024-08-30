import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

// data
import users from "./data/users.js";
import budgets from "./data/budget.js";
import pots from "./data/pot.js";
import transactions from "./data/transaction.js";
import recurringBills from "./data/recurringBill.js";





// db
import potsDB from "./models/potModel.js";
import transactionsDB from "./models/transactionModel.js";
import recuringBillsDB from "./models/RecuringBillModel.js";
import budgetsDB from "./models/budgetModel.js";
import usersDB from "./models/userModel.js";





import connectDB from "./config/db.js";


dotenv.config();

await connectDB();

const importData = async () => {
  try {
    console.log("data,calling");

    // delete

    await transactionsDB.deleteMany();
    await potsDB.deleteMany();
    await recuringBillsDB.deleteMany();
     await budgetsDB.deleteMany();
     await usersDB.deleteMany()


   //insert

await usersDB.insertMany(users);
 await budgetsDB.insertMany(budgets);
    await transactionsDB.insertMany(transactions);
    await potsDB.insertMany(pots);
    await recuringBillsDB.insertMany(recurringBills);
   
      

   


    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
      await transactionsDB.deleteMany();
      await potsDB.deleteMany();
      await recuringBillsDB.deleteMany();
      await budgetsDB.deleteMany();
      await usersDB.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

console.log(process.argv, process.argv[2]);

if (process.argv[2] === "-D") {
  destroyData();
} else {
  importData();
}
