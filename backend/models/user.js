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
  // name: { type: String },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  pdfUblValidation: {
    type: [pdfUblValidationSchema],
    default: [],
  },
  ublValidation: {
    type: [ublValidationSchema],
    default: [],
  },
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
