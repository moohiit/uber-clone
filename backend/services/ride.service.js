import Ride from '../models/ride.model.js';
import mapService from '../services/maps.service.js';
import crypto from 'crypto';

// function to calculate fare
const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required.");
  }

  const response = await mapService.getDistanceTime(pickup, destination);

  if (!response.success || !response.distanceTime) {
    throw new Error("Failed to fetch distance and time.");
  }

  const { distanceTime } = response;
  const distanceInKm = distanceTime.distance.value / 1000; // Convert meters to km
  const timeInMinutes = distanceTime.duration.value / 60; // Convert seconds to minutes

  // Base fare (in INR)
  const baseFareAuto = 30;
  const baseFareMotorcycle = 20;
  const baseFareCar = 50;

  // Cost per km (in INR)
  const costPerKmAuto = 10;
  const costPerKmMotorcycle = 8;
  const costPerKmCar = 12;

  // Cost per minute (in INR)
  const costPerMinuteAuto = 2;
  const costPerMinuteMotorcycle = 1.5;
  const costPerMinuteCar = 3;

  // Calculate fare for each vehicle
  const totalFareAuto =
    baseFareAuto +
    distanceInKm * costPerKmAuto +
    timeInMinutes * costPerMinuteAuto;
  const totalFareMotorcycle =
    baseFareMotorcycle +
    distanceInKm * costPerKmMotorcycle +
    timeInMinutes * costPerMinuteMotorcycle;
  const totalFareCar =
    baseFareCar +
    distanceInKm * costPerKmCar +
    timeInMinutes * costPerMinuteCar;

  return {
    auto: totalFareAuto.toFixed(2),
    motorcycle: totalFareMotorcycle.toFixed(2),
    car: totalFareCar.toFixed(2),
  };
};

//Generate Otp
const generateOtp = (length) => {
  if (!length || length <= 0) {
    throw new Error("Length must be a positive number.");
  }
  const otp = crypto.randomInt(Math.pow(10, length-1), Math.pow(10,length)).toString();
  return otp;
};
// create Ride 
const createRide = async (data) => {
  const { user, pickup, destination, vehicleType } = data;
  try {
    if (!user || !pickup || !destination || !vehicleType) {
      throw new Error(" All fields are required");
    }
    const fare = await getFare(pickup, destination);
    const ride = new Ride({
      user,
      pickup,
      destination,
      fare: fare[vehicleType],
      otp: generateOtp(6)
    })
    await ride.save();
    return ride;
  } catch (error) {
    throw error;
  }
}

export default {
  createRide,
}