import { Router } from "express";
import { body } from "express-validator";
import userControllers from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

// Register Route with Validations
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("email")
      .isLength({ min: 5 })
      .withMessage("Email must be atleast 5 characters long"),
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("Firstname must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  userControllers.registerUser
);

// Login Route with Validations
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("email")
      .isLength({ min: 5 })
      .withMessage("Email must be atleast 5 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  userControllers.login
);

// Get User Profile Route
router.get("/profile", isAuthenticated, userControllers.getUserProfile);

// Logout Route
router.get("/logout", isAuthenticated, userControllers.logout);

export default router;
