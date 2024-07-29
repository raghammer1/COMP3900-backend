const mongoose = require('mongoose');
const { defaultHtml } = require('../shared/defaultValidationHTML');
const { defaultJson } = require('../shared/defaultJson');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
//

const pdfUblValidationSchema = new mongoose.Schema({
  pdfId: { type: Schema.Types.Mixed },
  ublId: { type: ObjectId, ref: 'GridFS' },
  name: { type: String },
  date: { type: Date, default: Date.now },
  validatorId: { type: ObjectId, ref: 'GridFS' },
  validationHtml: { type: String, required: true, default: defaultHtml },
  validationJson: {
    type: Schema.Types.Mixed,
    required: true,
    default: defaultJson,
  },
});

const ublValidationSchema = new mongoose.Schema({
  ublId: { type: ObjectId, ref: 'GridFS' },
  validatorId: { type: ObjectId, ref: 'GridFS' },
  validationHtml: { type: String, required: true, default: defaultHtml },
  validationJson: {
    type: Schema.Types.Mixed,
    required: true,
    default: defaultJson,
  },
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
  body: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  googleId: { type: String },
  gln: { type: String },

  googlePicture: {
    type: Schema.Types.Mixed,
    ref: 'GridFS',
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
