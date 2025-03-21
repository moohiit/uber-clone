import axios from "axios";
import { configDotenv } from "dotenv";
import Captain from "../models/captain.model.js";
configDotenv({});
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GEOCODE_BASE_URL = process.env.GEOCODE_BASE_URL;
const DISTANCE_MATRIX_BASE_URL =process.env.DISTANCE_MATRIX_BASE_URL;

// get address coordinates
const getAddressCoordinates = async (address) => {
  try {
    if (!address || typeof address !== "string") {
      throw new Error("Invalid address provided.");
    }
    const formattedAddress = encodeURIComponent(address.trim());

    const response = await axios.get(GEOCODE_BASE_URL, {
      params: {
        address: formattedAddress,
        key: API_KEY,
      },
    });

    if (response.data.status !== "OK" || !response.data.results.length) {
      throw new Error("No results found for the given address.");
    }

    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message || error);
    throw error;
  }
};

//Get distance and time
const getDistanceTime = async (origin, destination) => {
  try {
    if (!origin || !destination) {
      throw new Error("Origin and destination are required.");
    }
    const formattedOrigin = encodeURIComponent(origin.trim());
    const formattedDestination = encodeURIComponent(destination.trim());
    const response = await axios.get(DISTANCE_MATRIX_BASE_URL, {
      params: {
        origins: formattedOrigin,
        destinations: formattedDestination,
        key: API_KEY,
      },
    });
    if (response.data.status !== "OK" || !response.data.rows.length) {
      throw new Error("No routes found for the given origin and destination.");
    }

    const element = response.data.rows[0].elements[0];
    if (element.status !== "OK") {
      throw new Error("Error in fetching distance and time.");
    }

    const distance = element.distance;
    const duration = element.duration;
    return { success: true, distanceTime: { distance, duration } };
  } catch (error) {
    console.error("Error fetching distance and time:", error.message || error);
    throw error;
  }
};

// get suggestions based on input
const getPlaceSuggestions = async (input) => {
  try {
    const formattedInput = encodeURIComponent(input.trim());
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input: formattedInput,
          key: API_KEY,
        },
      }
    );
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions.");
    }
  } catch (error) {
    console.error("Error fetching place suggestions:", error.message || error);
    throw error;
  }
};

// get captians in the area
const getCaptainsInTheRadius = async (lat, lng, radius) => {
    // radius in km
    const captains = await Captain.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ lat, lng ], radius / 6371 ]
            }
        }
    });
  return captains;
}

export default {
  getAddressCoordinates,
  getDistanceTime,
  getPlaceSuggestions,
  getCaptainsInTheRadius
};
