const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
//
const pdfUblValidationSchema = new mongoose.Schema({
  pdfId: { type: ObjectId, ref: 'GridFS' },
  ublId: { type: ObjectId, ref: 'GridFS' },
  validatorId: { type: ObjectId, ref: 'GridFS' },
  name: { type: String },
  date: { type: Date, default: Date.now },
});

const ublValidationSchema = new mongoose.Schema({
  ublId: { type: ObjectId, ref: 'GridFS' },
  validatorId: { type: ObjectId, ref: 'GridFS' },
  name: { type: String },
  date: { type: Date, default: Date.now },
});

const historyEmailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  fileTypes: { type: [String], required: true },
  date: { type: Date, default: Date.now },
  process: { type: String, required: true },
  sharedObjId: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  googleId: { type: String },
  gln: { type: String },
  // googlePicture: { type: String },
  googlePicture: {
    type: Schema.Types.Mixed, // Allow either String or ObjectId
    ref: 'GridFS', // Reference to GridFS
  },
  pdfUblValidation: {
    type: [pdfUblValidationSchema],
    default: [],
  },
  ublValidation: {
    type: [ublValidationSchema],
    default: [],
  },
  historyEmail: {
    type: [historyEmailSchema],
    default: [],
  },
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
