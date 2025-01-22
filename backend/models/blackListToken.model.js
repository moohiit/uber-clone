import { Schema, model } from 'mongoose';

const blackListTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours in seconds
  }
});

const BlackListToken = model('BlackListToken', blackListTokenSchema);

export default BlackListToken;