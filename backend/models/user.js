const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const pdfUblValidationSchema = new mongoose.Schema({
  pdfId: { type: ObjectId, ref: 'GridFS' },
  ublId: { type: ObjectId, ref: 'GridFS' },
  validatorId: { type: ObjectId, ref: 'GridFS' },
});

const ublValidationSchema = new mongoose.Schema({
  ublId: { type: ObjectId, ref: 'GridFS' },
  validatorId: { type: ObjectId, ref: 'GridFS' },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  // Will be an object where keys are ObjectId strings and values are objects containing ids of pdf, related ubl id, and related validation id
  pdfUblValidation: {
    type: Map,
    of: {
      type: pdfUblValidationSchema,
      default: {},
    },
  },
  // Will be an object where keys are ObjectId strings and values are objects containing ubl id and related validation id
  ublValidation: {
    type: Map,
    of: {
      type: ublValidationSchema,
      default: {},
    },
  },
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
