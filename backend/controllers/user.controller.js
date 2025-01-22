import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

// Register User Controller
export const registerUser = async (req, res) => {
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
    const user = await createUser({
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
export const login = (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};
export const logout = (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};
