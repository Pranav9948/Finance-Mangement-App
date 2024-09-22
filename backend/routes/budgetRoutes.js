import express from "express";
import {
  getAllBudgets,
  getCategories,
  updateBudget,
  getAllSetBudgets,
} from "../controllers/budgetControllers.js";

const router = express.Router();

router.route("/").get(getAllBudgets).post(updateBudget);
router.route("/getCategories").get(getCategories);
router.route("/getSetBudget").get(getAllSetBudgets);

export default router;
