import express from "express";
import {
  getAllBudgets,
  getSingleBudget,
} from "../controllers/budgetControllers.js";


const router = express.Router();

router.route("/").get(getAllBudgets);

router.route("/:id").get(getSingleBudget);

export default router;