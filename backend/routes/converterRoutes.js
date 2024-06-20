const express = require('express');
const router = express.Router();
const converterControllers = require('../pdfConverter/converterControllers');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const JoiObjectId = require('joi-objectid')(joi);
const auth = require('../middleware/auth');

const fileUploadSchema = joi.object({
  userId: JoiObjectId().required(),
  file: joi.object().required(), // Ensure that the file object is present
});

router.port(
  '/convert-pdf',
  auth,
  validator.body(fileUploadSchema),
  converterControllers.controllers.postConvertToPdf
);

module.exports = router;
