import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import usersDB from "../models/userModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

//  @desc  Auth User & Get Token
//  @routes POST api/users/login
// @ access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  // check if email exist

  const userExist = await User.findOne({ email: email });

  if (userExist && (await userExist.matchPassword(password))) {
    await generateToken(res, userExist._id);

    return res.json({
      id: userExist._id,
      email: userExist.email,
      username: userExist.username,
    });
  }

  res.status(401);
  res.json({ message: "invalid username and password" });
});

//  @desc   User Registration
//  @routes POST api/users/register
// @ access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await usersDB.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await usersDB.create({
    username,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

//  @desc   get user Profile
//  @routes GET api/users/profile
// @ access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await usersDB.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//  @desc   update user Profile
//  @routes PUT api/users/profile
// @ access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
};
