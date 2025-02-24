import { validationResult } from "express-validator";
import Ride from "../models/ride.model.js";
import rideService from "../services/ride.service.js";

// Create ride
const createRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
        success: false,
      });
    }
    const { pickup, destination, vehicleType } = req.body;
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json({
      success: false,
      message: "Ride Created Successfully.",
      ride,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

// Get Fare of a ride
const getFare = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
        success: false,
      });
    }
    const { pickup, destination } = req.query;
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json({
      success: true,
      message: "Fare Calculated Successfully",
      fare,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

export default {
  createRide,
  getFare,
};
