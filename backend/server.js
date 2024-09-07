import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {
  errorHandler,
  notFound,
} from "../backend/middleware/errorMiddleware.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

console.log("port", port);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/budgets", budgetRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
