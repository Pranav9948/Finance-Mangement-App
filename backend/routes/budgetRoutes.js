import express from "express";
import {
  getAllBudgets,
getCategories,
  createBudget,
} from "../controllers/budgetControllers.js";


const router = express.Router();

router.route("/").get(getAllBudgets).post(createBudget);
router.route("/getCategories").get(getCategories);

export default router;