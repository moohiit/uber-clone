import Captain from "../models/captain.model.js";

const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  type,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !type
  ) {
    throw new Error("All fields are required");
  }
  const newCaptain = new Captain({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      type,
    },
  });
  await newCaptain.save();
  return newCaptain;
};

export default {
  createCaptain,
};
