const postConvertToPdf = require('./postConvertToPdf');
const getConvertionData = require('./getConvertionData');
const deleteConvertionData = require('./deleteConvertionData.js');
const postConvertGuiForm = require('./postConvertGuiForm.js');

exports.controllers = {
  postConvertToPdf,
  getConvertionData,
  deleteConvertionData,
  postConvertGuiForm,
};
