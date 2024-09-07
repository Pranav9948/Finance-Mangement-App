import express from "express";
import {protect} from '../middleware/authMiddleware.js'

import {
  authUser,getUserProfile,logoutUser,registerUser,updateUserProfile
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/login").post(authUser);

router.route("/register").post(registerUser);

router.route("/logout").post(logoutUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)


export default router;
