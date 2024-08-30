import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {errorHandler,notFound} from '../backend/middleware/errorMiddleware.js';
import budgetRoutes from './routes/budgetRoutes.js'

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

console.log("port", port);

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.use("/api/budgets", budgetRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
