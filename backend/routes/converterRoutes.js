// const express = require('express');
// const router = express.Router();
// const converterControllers = require('../pdfConverter/converterControllers');
// const joi = require('joi');
// const validator = require('express-joi-validation').createValidator({});
// const JoiObjectId = require('joi-objectid')(joi);
// const auth = require('../middleware/auth');
// const { upload } = require('../gridfs');

// const fileUploadSchema = joi.object({
//   userId: JoiObjectId().required(),
//   file: joi.object().required(), // Ensure that the file object is present
// });

// router.post(
//   '/convert-pdf',
//   auth,
//   validator.body(fileUploadSchema),
//   upload.single('file'),
//   converterControllers.controllers.postConvertToPdf
// );

// module.exports = router;
const express = require('express');
const router = express.Router();
const converterControllers = require('../pdfConverter/converterControllers');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const JoiObjectId = require('joi-objectid')(joi);
const auth = require('../middleware/auth');
const multer = require('multer');

const fileUploadSchema = joi.object({
  userId: JoiObjectId().required(),
  file: joi.object().required(), // Ensure that the file object is present
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/upload-pdf',
  auth,
  upload.single('file'),
  // validator.body(fileUploadSchema),
  converterControllers.controllers.postConvertToPdf
);

module.exports = router;
