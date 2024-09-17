import express from "express";
import budgetsDB from "../models/budgetModel.js";
import {
  createNewPot,
  addMoney,
  withDrawMoney,
  getAllPots,
} from "../controllers/potController.js";

const router = express.Router();

router.route("/").get(getAllPots).post(createNewPot);

router.route("/:id").put(addMoney);
router.route("/:id").delete(withDrawMoney);

export default router;
