import express from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";
import mapController from "../controllers/maps.controller.js";
const router = express.Router();
import { query } from 'express-validator';


router.get("/get-coordinates",
  query('address').isString().isLength({min:3}),
  authMiddleware.authUser,
  mapController.getCoordinates
)

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getSuggestions
);



export default router;
