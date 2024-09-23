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
import Multer from "multer";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

/**
 *  cross-origin configuration
 *  prevents cross origin error and preflight error
 */

const prodOrigins = [
  "https://budgetbuddyfinance-woad.vercel.app",
  "https://budgetbuddyfinance-git-main-pranavs-projects-162a17c2.vercel.app",
  "https://budgetbuddyfinance-qic8tej2q-pranavs-projects-162a17c2.vercel.app",
];

const devOrigin = ["http://localhost:5173"];
const allowedOrigins = NODE_ENV === "production" ? prodOrigins : devOrigin;

console.log("node_env", NODE_ENV);
app.use(
  cors({
    origin: (origin, callback) => {
      if (NODE_ENV === "production") {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`${origin} not allowed by cors`));
        }
      } else {
        callback(null, true);
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

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
