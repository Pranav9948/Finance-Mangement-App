import express from "express";


import {
 
  createBill,getBills
} from "../controllers/recurringBillsControllers.js";

const router = express.Router();

router.route("/").get(getBills).post(createBill)



export default router;
