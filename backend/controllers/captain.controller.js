import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import BlackListToken from "../models/blackListToken.model.js";
import captainService from "../services/captain.service.js";

// Controller to register a new captain.
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({
        success: false,
        message: "Validation Error please send correct data.",
        error:errors.array()
      })
    }
    const { email, fullname, password, vehicle } = req.body;
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({
        success: false,
        message:"User already exist"
      })
    }
    const hashedPassword = await Captain.hashPassword(password);
    console.log("Hash:", hashedPassword);
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();
    return res.status(201).json({
      success: true,
      message: "Captain Created successfully.",
      token,
      captain
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message || "Internal server error",
      success:false,
    })
  }
}

export default {
  register,
}