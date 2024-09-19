import express from "express";


import {
  createBill,
  getBills,
  getCategories,
  makePayment,
  getAllPaidBills,
  getAllUnPaidBills,
  getAllOverdueBills,
  getUnPaidBillsinSevenDays,
  getUnPaidBillsinFourteenDays,
  getUnPaidBillsinThirteenDays,
} from "../controllers/recurringBillsControllers.js";

const router = express.Router();

router.route("/").get(getBills).post(createBill)
router.route("/:id").put(makePayment)
router.route("/unpaid-bills").get(getAllUnPaidBills);
router.route("/paid-bills").get(getAllPaidBills);
router.route("/getcategories").get(getCategories);
router.route("/overdue-bills").get(getAllOverdueBills);
router.route("/unpaid-within-seven-days").get(getUnPaidBillsinSevenDays);
router.route("/unpaid-within-fourteen-days").get(getUnPaidBillsinFourteenDays);
router.route("/unpaid-within-thirteen-days").get(getUnPaidBillsinThirteenDays);



export default router;
