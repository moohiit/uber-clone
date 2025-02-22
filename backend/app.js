import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
configDotenv({});

export const app = express();
app.use(
  cors({
    origin: [
      " http://localhost:5173",
      "http://192.168.1.21:5173",
      "http://172.29.48.1:5173",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from the server...");
});

// routes Import
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import mapsRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";
// Routes
app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/ride", rideRoutes);
