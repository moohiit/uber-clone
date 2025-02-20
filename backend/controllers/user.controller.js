import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import UserService from "../services/user.service.js";
import BlackListToken from "../models/blackListToken.model.js";

// Register User Controller
const registerUser = async (req, res) => {
  // console.log("Body: ", req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
        success: false,
      });
    }
    const { firstname, lastname, email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await User.hashPassword(password);
    const user = await UserService.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    const token = user.generateAuthToken();
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

// Login User Controller
const login = async (req, res) => {
  // console.log("Body: ",req.body)
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
        success: false,
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Email does not exist in our records",
        success: false,
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password is incorrect",
        success: false,
      });
    }
    const token = user.generateAuthToken();
    return res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        success: true,
        user,
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

// Get User Profile Controller
const getUserProfile = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User profile fetched successfully",
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

// Logout User Controller
const logout = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }
    await BlackListToken.create({ token });
    res.clearCookie("token");
    return res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

export default { registerUser, login, getUserProfile, logout };