import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters"],
      },
      lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be atleast 5 characters long"],
      match: [/^\S+@\S+\.\S+$/,'Please enter a valid email']
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be atleast 6 characters long"],
      select: false,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], 
      default:'inactive'
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, 'Color must be at least 3 characters long'],
      },
      plate: {
        type: String,
        required: true,
        minlength: [4, "Plate must be at least 4 characters long"]
      },
      capacity: {
        type: Number,
        required: true,
        min:[1,'capacity must be at least 1'],
      },
      vehicleType: {
        type: String,
        required: true,
        enum:['car','motorcycle', 'auto']
      }
    },
    location: {
      lat: {
        type:Number,
      },
      lng: {
        type:Number,
      }
    }
  },
  {
    timestamps: true,
  }
);


captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id:this._id
  }, process.env.JWT_SECRET, { expiresIn: '24h' })
  return token;
}

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}

const Captain = mongoose.model("Captain", captainSchema);

export default Captain;