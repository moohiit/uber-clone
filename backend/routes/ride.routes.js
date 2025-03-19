import express from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";
import rideController from "../controllers/ride.controller.js";
const router = express.Router();
import { body, query } from 'express-validator';

router.post('/create',
  authMiddleware.authUser,
  body('pickup').isString().isLength({min:3}).withMessage("Invalid origin location"),
  body('destination').isString().isLength({ min: 3 }).withMessage("Invalid destination location"),
  body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage("Invalid vehicleType"),
  rideController.createRide
)

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup location"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination"),
  rideController.getFare
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  rideController.confirmRide
);

router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  rideController.startRide
);

router.post(
  "/end-ride",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  rideController.endRide
);

export default router;