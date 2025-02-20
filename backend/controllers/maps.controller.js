import { validationResult } from "express-validator";
import mapService from "../services/maps.service.js"

// get coordinates
const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  const { address } = req.query;
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message:errors.array()[0].msg
    })
  }
  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    return res.status(200).json({
      success: true,
      message: "Coordinates fetched successfully.",
      coordinates
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.meaasge || "Internal server Error",
      success:false
    })
  }
}

// get distance and time
const getDistanceTime = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }
    const { origin, destination } = req.query;
    const distanceTime = await mapService.getDistanceTime(origin, destination);
    return res.status(200).json({
      success: true,
      message: "Distance and time fetched successfully.",
      distanceTime
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.meaasge || "Internal server Error",
      success: false,
    });
  }
}

// get Suggestions 
const getSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }
    const { input } = req.query;
    const predictions = await mapService.getPlaceSuggestions(input);
    return res.status(200).json({
      success: true,
      message: "Suggestions fetched successfully.",
      predictions
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.meaasge || "Internal server Error",
    });
  }
}
export default {
  getCoordinates,
  getDistanceTime,
  getSuggestions,
};