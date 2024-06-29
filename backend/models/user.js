// const mongoose = require('mongoose');

// const pdfUblValidationSchema = new mongoose.Schema({
//   pdfId: { type: mongoose.Schema.Types.ObjectId, ref: 'GridFS' },
//   ublId: { type: mongoose.Schema.Types.ObjectId, ref: 'GridFS' },
//   validatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'GridFS' },
//   // name: { type: String, required: true },
// });

// const ublValidationSchema = new mongoose.Schema({
//   ublId: { type: mongoose.Schema.Types.ObjectId, ref: 'GridFS' },
//   validatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'GridFS' },
//   // name: { type: String, required: true },
// });

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   username: { type: String },
//   password: { type: String },
//   // Will be an array of objects containing ids of pdf, related ubl id and related validation id
//   pdfUblValidation: [pdfUblValidationSchema],
//   // Will be an array of objects containing ubl id and related validation id, this is for case where user just upload ubl for validation and not the pdf as well
//   ublValidation: [ublValidationSchema],
//   // pdfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' }],
// });

// userSchema.index({ location: '2dsphere' });

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

// const pdfUblValidationSchema = new mongoose.Schema({
//   pdfId: { type: ObjectId, ref: 'GridFS' },
//   ublId: { type: ObjectId, ref: 'GridFS' },
//   validatorId: { type: ObjectId, ref: 'GridFS' },
//   // name: { type: ObjectId, required: true },
// });

// const ublValidationSchema = new mongoose.Schema({
//   ublId: { type: ObjectId, ref: 'GridFS' },
//   validatorId: { type: ObjectId, ref: 'GridFS' },
//   // name: { type: ObjectId, required: true },
// });

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   username: { type: String },
//   password: { type: String },
//   // Will be an object where keys are ObjectId strings and values are objects containing ids of pdf, related ubl id, and related validation id
//   pdfUblValidation: { type: Map, of: pdfUblValidationSchema },
//   // Will be an object where keys are ObjectId strings and values are objects containing ubl id and related validation id
//   ublValidation: { type: Map, of: ublValidationSchema },
//   // pdfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' }],
// });

// userSchema.index({ location: '2dsphere' });

// module.exports = mongoose.model('User', userSchema);
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
