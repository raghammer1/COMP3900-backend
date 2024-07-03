const validateUblFile = require('./validateUblFile');
const getUblPdf = require('./getUblPdf.js');
const getAllValidationData = require('./getAllValidationData.js');
const deleteOneValidationData = require('./deleteOneValidationData');

exports.controllers = {
  validateUblFile,
  getUblPdf,
  getAllValidationData,
  deleteOneValidationData,
};
