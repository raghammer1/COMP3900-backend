const mongoose = require('mongoose');
const { defaultHtml } = require('../shared/defaultValidationHTML'); // Default HTML for validation
const { defaultJson } = require('../shared/defaultJson'); // Default JSON for validation
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Schema for PDF UBL validation details
const pdfUblValidationSchema = new mongoose.Schema({
  pdfId: { type: Schema.Types.Mixed }, // Mixed type for flexibility with PDF ID
  ublId: { type: ObjectId, ref: 'GridFS' }, // Reference to GridFS for UBL ID
  name: { type: String }, // Name of the validation
  date: { type: Date, default: Date.now }, // Date of validation, defaults to current date
  validatorId: { type: ObjectId, ref: 'GridFS' }, // Reference to GridFS for validator ID
  validationHtml: { type: String, required: true, default: defaultHtml }, // HTML validation result
  validationJson: {
    type: Schema.Types.Mixed,
    required: true,
    default: defaultJson, // JSON validation result
  },
});

// Schema for UBL validation details
const ublValidationSchema = new mongoose.Schema({
  ublId: { type: ObjectId, ref: 'GridFS' }, // Reference to GridFS for UBL ID
  validatorId: { type: ObjectId, ref: 'GridFS' }, // Reference to GridFS for validator ID
  validationHtml: { type: String, required: true, default: defaultHtml }, // HTML validation result
  validationJson: {
    type: Schema.Types.Mixed,
    required: true,
    default: defaultJson, // JSON validation result
  },
  name: { type: String }, // Name of the validation
  date: { type: Date, default: Date.now }, // Date of validation, defaults to current date
});

// Schema for email history
const historyEmailSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Email address
  subject: { type: String, required: true }, // Email subject
  fileTypes: { type: [String], required: true }, // Types of files shared
  date: { type: Date, default: Date.now }, // Date of the email, defaults to current date
  process: { type: String, required: true }, // Process description
  sharedObjId: { type: String, required: true }, // ID of the shared object
  body: { type: String, required: true }, // Email body content
});

// Main user schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true }, // User's email, must be unique
  username: { type: String }, // Username
  password: { type: String }, // User's password
  googleId: { type: String }, // Google ID for authentication
  gln: { type: String }, // Global Location Number or other identifier

  googlePicture: {
    type: Schema.Types.Mixed,
    ref: 'GridFS', // Reference to GridFS for profile picture
  },
  pdfUblValidation: {
    type: [pdfUblValidationSchema], // Array of PDF UBL validation entries
    default: [], // Defaults to empty array
  },
  ublValidation: {
    type: [ublValidationSchema], // Array of UBL validation entries
    default: [], // Defaults to empty array
  },
  historyEmail: {
    type: [historyEmailSchema], // Array of email history entries
    default: [], // Defaults to empty array
  },
});

userSchema.index({ location: '2dsphere' }); // Index for geospatial queries

module.exports = mongoose.model('User', userSchema); // Export the user model
