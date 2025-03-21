import { validationResult } from "express-validator";
import rideService from "../services/ride.service.js";
import { sendMessageToSocketId } from "../socket.js";
import mapsService from "../services/maps.service.js";
import Ride from "../models/ride.model.js";

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
    const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);

    const captainsInRadius = await mapsService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );

    ride.otp = "";

    const rideWithUser = await Ride
      .findOne({ _id: ride._id })
      .populate("user");

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
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

const confirmRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const { rideId } = req.body;
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    return res.status(200).json({
      sucess: true,
      message:"Ride confirmed Successfully",
      ride
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
}

const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success:false, message: errors.array()[0].msg });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    console.log(ride);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json({
      success: true,
      message: "Ride Started Successfully.",
      ride
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success:false, message: errors.array()[0].msg });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json({
      success: true,
      message: "Ride Ended Successfully.",
      ride
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
  confirmRide,
  startRide,
  endRide,
};
