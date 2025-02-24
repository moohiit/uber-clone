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

export default router;