Sure, here's a comprehensive documentation for the provided Mongoose schema:

````markdown
# User Schema Documentation

## Overview

This document provides a detailed description of the `User` schema and its sub-schemas for a MongoDB database using Mongoose. The `User` schema is designed to store user information, including their validation data and email history related to e-invoicing processes.

## Schemas

### User Schema

The `User` schema represents the main user entity in the application. It contains the user's basic information, validation data, and email history.

```javascript
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
```
````

### Fields

- `email`: The user's email address. This field is unique and required.
- `username`: The user's username.
- `password`: The user's password.
- `googleId`: The user's Google ID if they signed up using Google.
- `gln`: The user's Global Location Number.
- `googlePicture`: A reference to the user's Google profile picture stored in GridFS.
- `pdfUblValidation`: An array of PDF UBL validation records associated with the user.
- `ublValidation`: An array of UBL validation records associated with the user.
- `historyEmail`: An array of email history records associated with the user.

### Indexes

- `location`: Indexed as a 2dsphere to support geospatial queries.

## Sub-Schemas

### PDF UBL Validation Schema

The `pdfUblValidationSchema` stores validation data for PDFs converted to UBL format.

```javascript
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
```

#### Fields

- `pdfId`: The ID of the PDF file, stored in a mixed type.
- `ublId`: A reference to the UBL file stored in GridFS.
- `name`: The name of the validation record.
- `date`: The date the validation was performed, defaulting to the current date.
- `validatorId`: A reference to the validator file stored in GridFS.
- `validationHtml`: The HTML representation of the validation result, required and defaults to `defaultHtml`.
- `validationJson`: The JSON representation of the validation result, required and defaults to `defaultJson`.

### UBL Validation Schema

The `ublValidationSchema` stores validation data for UBL files.

```javascript
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
```

#### Fields

- `ublId`: A reference to the UBL file stored in GridFS.
- `validatorId`: A reference to the validator file stored in GridFS.
- `validationHtml`: The HTML representation of the validation result, required and defaults to `defaultHtml`.
- `validationJson`: The JSON representation of the validation result, required and defaults to `defaultJson`.
- `name`: The name of the validation record.
- `date`: The date the validation was performed, defaulting to the current date.

### History Email Schema

The `historyEmailSchema` stores email history related to the user's e-invoicing activities.

```javascript
const historyEmailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  fileTypes: { type: [String], required: true },
  date: { type: Date, default: Date.now },
  process: { type: String, required: true },
  sharedObjId: { type: String, required: true },
  body: { type: String, required: true },
});
```

#### Fields

- `email`: The recipient's email address, required.
- `subject`: The subject of the email, required.
- `fileTypes`: An array of file types included in the email, required.
- `date`: The date the email was sent, defaulting to the current date.
- `process`: The process related to the email (e.g., validation, sending), required.
- `sharedObjId`: The ID of the shared object, required.
- `body`: The body content of the email, required.

---

By organizing the user data and related validation and email records into these schemas, we ensure a structured and efficient way to manage the information. Each sub-schema is designed to capture specific aspects of the user's interactions with the e-invoicing application, providing a comprehensive and flexible data model.

```

```
