const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
  email: String,
  token: String,
  createdAt: { type: Date, default: Date.now, expires: 360000 }, // OTP expires after 90 seconds
});

module.exports = mongoose.model('OTP', forgotPasswordSchema);
