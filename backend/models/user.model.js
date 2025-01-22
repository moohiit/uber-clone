import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema(
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
      minlength: [5, 'Email must be atleast 5 characters long']
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be atleast 6 characters long'],
      select: false
    },
    socketId: {
      type: String,
    }
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function (password) {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);
