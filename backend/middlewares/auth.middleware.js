
import BlackListToken from "../models/blackListToken.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => { 
  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access to this resource, token not found",
        success: false,
      });
    }
    const isBlackListed = await BlackListToken.findOne({ token });
    if (isBlackListed) {
      return res.status(401).json({
        message: "Token expired or blacklisted",
        success: false,
      });
    } 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
}

export default isAuthenticated;