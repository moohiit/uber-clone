import express from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";
import rideController from "../controllers/ride.controller.js";
const router = express.Router();
import { body } from 'express-validator';

router.post('/create',
  authMiddleware.authUser,
  body('pickup').isString().isLength({min:3}).withMessage("Invalid origin"),
  body('destination').isString().isLength({ min: 3 }).withMessage("Invalid origin"),
  body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage("Invalid vehicleType"),
  rideController.createRide
)


export default router;