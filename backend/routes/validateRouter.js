const express = require('express');
const router = express.Router();
const validateControllers = require('../ublValidator/validateControllers');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const JoiObjectId = require('joi-objectid')(joi);
const auth = require('../middleware/auth');
const multer = require('multer');

const fileUploadSchema = joi.object({
  userId: JoiObjectId().required(),
  file: joi.object().required(),
  // name: joi.string().required(),
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .post(
    '/validate-ubl',
    auth,
    upload.single('file'),
    // validator.body(fileUploadSchema),
    validateControllers.controllers.validateUblFile
  )
  .get('/getUbl/:userId', validateControllers.controllers.getUblPdf)
  .get(
    '/get-all-validation-data',
    validateControllers.controllers.getAllValidationData
  )
  .delete(
    '/delete-one-validation-data',
    validateControllers.controllers.deleteOneValidationData
  );

module.exports = router;
