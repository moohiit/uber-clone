import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import BlackListToken from "../models/blackListToken.model.js";
import captainService from "../services/captain.service.js";

// Controller to register a new captain.
const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({
        success: false,
        message: "Validation Error please send correct data.",
        error: errors.array(),
      });
    }
    const { email, fullname, password, vehicle } = req.body;
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    const hashedPassword = await Captain.hashPassword(password);
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      type: vehicle.type,
    });

    const token = captain.generateAuthToken();
    return res.status(201).json({
      success: true,
      message: "Captain Created successfully.",
      token,
      captain,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

// Login Controller for captain.
const loginCaptain = async (req, res) => {
 try {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({success:false, message: errors.array()})
   }
   const { email, password } = req.body;
   const captain = await Captain.findOne({ email }).select("+password");
   if (!captain) {
     return res.status(401).json({
       success: false,
       message:"Captain not found."
     })
   }
   const ispasswordMatched = await captain.comparePassword(password);
   if (!ispasswordMatched) {
     return res.status(401).json({
       success: false,
       message:"Incorrect or wrong password."
     })
   }
   const token = captain.generateAuthToken();
   return res.cookie('token',token)
     .status(200).json({
     success: true,
       token,
       captain,
     message:"Captain Logged in Successfully."
   })
 } catch (error) {
  console.log(error);
  return res.status(500).json({
    message: error.message || "Internal server error",
    success: false,
  });
 }
}

//Profile Controller for Captain
const getCaptainProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      captain: req.captain
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
}

const logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlackListToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({
      message: "Captain Logout successfully.",
      success:true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
}
export default {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
};