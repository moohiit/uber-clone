import express from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";
import rideController from "../controllers/ride.controller.js";
const router = express.Router();
import { query } from 'express-validator';




export default router;