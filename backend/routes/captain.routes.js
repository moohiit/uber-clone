import captainControllers from "../controllers/captain.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("firstname must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 4 })
      .withMessage("plate must be at least 4 characters long"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "auto", "motorcycle"])
      .withMessage("Invalid vehicle type"),
  ],
  captainControllers.registerCaptain
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  captainControllers.loginCaptain
);
router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainControllers.getCaptainProfile
);
router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainControllers.logoutCaptain
);
export default router;
