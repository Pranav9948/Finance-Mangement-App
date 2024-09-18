import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {
  errorHandler,
  notFound,
} from "../backend/middleware/errorMiddleware.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import recurringBillsRoutes from "./routes/recurringBills.js";
import potRoutes from "./routes/potRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import Multer from "multer"

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

console.log("port", port);


// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/budgets", budgetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/pots", potRoutes);
app.use("/api/recurring-bills", recurringBillsRoutes);



app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
