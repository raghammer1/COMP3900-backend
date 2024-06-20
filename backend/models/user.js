const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  // Will be an array of objects containing ids of pdf, related ubl id and related validation id
  pdfUblValidation: { type: Array },
  // Will be an array of objects containing ubl id and related validation id, this is for case where user just upload ubl for validation and not the pdf as well
  ublValidation: { type: Array },
  pdfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' }],
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
