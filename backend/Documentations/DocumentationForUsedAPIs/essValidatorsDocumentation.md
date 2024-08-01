# ESS Validate API Documentation for XML UBL File Validation

## Overview

This documentation provides a comprehensive guide on using the ESS Validate API for validating XML UBL (Universal Business Language) files. The ESS Validate API checks XML invoices against predefined business rules and returns a detailed validation report in JSON format.

## Authentication

### OAuth2 Method and Flow

- **OAuth2** is used to secure the endpoints.
- Access any endpoint using a JWT access token.
- Generate this token using the OAuth2 protocol, following the Client Credentials Flow.

#### OAuth2 Parameters and Client App

- **Authorization Server**: Cognito
- **ClientID**: `7d30bi87iptegbrf2bp37p42gg`
- **ClientSecret**: `880tema3rvh3h63j4nquvgoh0lgts11n09bq8597fgrkvvd62su`
- **Scope**: `eat/read`
- **Grant Type**: `client_credentials`
- **Token Endpoint URI**: `https://dev-eat.auth.eu-central-1.amazoncognito.com/oauth2/token`

### Generating the Authorization Token

You can generate the token using your preferred language or tool by calling the Token endpoint.

#### Example in cURL

```bash
curl --request POST \
  --url 'https://dev-eat.auth.eu-central-1.amazoncognito.com/oauth2/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials' \
  --data 'client_id=7d30bi87iptegbrf2bp37p42gg' \
  --data 'client_secret=880tema3rvh3h63j4nquvgoh0lgts11n09bq8597fgrkvvd62su' \
  --data 'scope=eat/read'
```

#### Example using Postman

1. Create a new POST request.
2. Set the URL to `https://dev-eat.auth.eu-central-1.amazoncognito.com/oauth2/token`.
3. Set the headers:
   - `Content-Type: application/x-www-form-urlencoded`
4. Set the body (form-data):
   - `grant_type`: `client_credentials`
   - `client_id`: `7d30bi87iptegbrf2bp37p42gg`
   - `client_secret`: `880tema3rvh3h63j4nquvgoh0lgts11n09bq8597fgrkvvd62su`
   - `scope`: `eat/read`
5. Send the request and copy the `access-token` from the response.

## ESS Validate API

### Description

- Validates invoice XML documents against a set of business rules.
- Takes an XML file as input and generates a JSON report.

### Calling the API

#### Via Swagger UI

- **URL**: `https://services.ebusiness-cloud.com/ess-schematron/swagger-ui/index.html`

##### Authentication on Swagger

1. Generate your token.
2. Go to the Swagger UI screen and click on the “Authorize” button.
3. Paste your token and click “Authorize”.

#### Swagger UI Endpoints

1. **Single Validation**

   - Validates XML file against a single set of business rules.
   - Select the set of rules and the XML file to validate.
   - Click "Execute" to run the validation.
   - Response code 200 with validation report in the response body.

2. **Multi-validation**
   - Validates XML file against multiple sets of business rules.
   - Select multiple sets of rules and the XML file.
   - Click "Execute" to run the validation.
   - Response code 200 with validation report in the response body.

### Programmatic Access

#### API Endpoint

- **URL**: `https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10`

#### Request Headers

- `Authorization`: Bearer `<access-token>`
- `Accept`: application/json
- `Content-Type`: multipart/form-data

### Example Code in Node.js

```javascript
const axios = require('axios');
const FormData = require('form-data');
const { Readable } = require('stream');
const { getToken } = require('../ublValidator/tokenService');

const apiCallingForValidation = async (
  ublBuffer,
  originalFilename,
  mimeType
) => {
  try {
    const validationUrl =
      'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';
    const apiKey = await getToken();
    const form = new FormData();
    const validationFileStream = new Readable();
    validationFileStream.push(ublBuffer);
    validationFileStream.push(null);

    form.append('file', validationFileStream, {
      filename: originalFilename,
      contentType: mimeType,
    });

    const response = await axios.post(validationUrl, form, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        ...form.getHeaders(),
      },
    });

    const validationErrors =
      response.data.report.reports.AUNZ_PEPPOL_1_0_10.firedAssertionErrors;
    return validationErrors;
  } catch {
    throw new Error('API validation failed');
  }
};

module.exports = { apiCallingForValidation };
```

## Validation Report Format

The validation report is returned in JSON format and includes the following:

- Overall validation result (successful or not).
- Summary of the result.
- List of individual validations for each set of rules.
- For each failed validation:
  - `id`: Rule code.
  - `text`: Description of the validation error.
  - `location`: XPath of the data in the XML.

### Example of a Failed Validation Report

```json
{
  "customer": "Online validation tool",
  "successful": false,
  "message": "Schematron validation on file 'invoice.xml' completed with status: FAILED. Total failed assertions count= 2. Failed assertions codes: { PEPPOL-EN16931-R007-AUNZ-SB, PEPPOL-EN16931-R004-AUNZ-SB }. Total reports count= 0.",
  "report": {
    "successful": false,
    "summary": "Validation failed. Check individual validation reports for details",
    "filename": "invoice.xml",
    "reports": {
      "AUNZ_PEPPOL_SB_1_0_10": {
        "rules": "AUNZ_PEPPOL_SB_1_0_10",
        "successful": false,
        "summary": "Validation result for AUNZ_PEPPOL_SB_1_0_10: Failed. Failed assertions count = 2. Assertion errors: { PEPPOL-EN16931-R007-AUNZ-SB, PEPPOL-EN16931-R004-AUNZ-SB }. Schematron Reports fired: no schematron reports fired.",
        "firedAssertionErrors": [
          {
            "id": "PEPPOL-EN16931-R007-AUNZ-SB",
            "text": "Business process MUST be in the format 'urn:fdc:peppol.eu:2017:poacc:selfbilling:NN:1.0' where NN indicates the process number.",
            "location": "/*:Invoice[namespace-uri()='urn:oasis:names:specification:ubl:schema:xsd:Invoice-2'][1]",
            "test": "$profile != 'Unknown'",
            "flag": "fatal"
          },
          {
            "id": "PEPPOL-EN16931-R004-AUNZ-SB",
            "text": "Specification identifier MUST have the value 'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:selfbilling:international:aunz:3.0'.",
            "location": "/*:Invoice[namespace-uri()='urn:oasis:names:specification:ubl:schema:xsd:Invoice-2'][1]",
            "test": "starts-with(normalize-space(cbc:CustomizationID/text()), 'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:selfbilling:international:aunz:3.0')",
            "flag": "fatal"
          }
        ],
        "firedSuccessfulReports": [],
        "firedAssertionErrorsCount": 2,
        "firedSuccessfulReportsCount": 0,
        "firedAssertionErrorCodes": ["PEPPOL-EN16931-R007-AUNZ-SB", "PEPPOL-EN16931-R004-AUNZ-SB"]
      },
      "AUNZ_UBL_1_0_10": {
        "rules": "AUNZ_UBL_1_0_10",
        "successful": true,
        "summary": "Validation result for AUNZ_UBL_1_0_10: Successful. No assertion errors fired. Schematron Reports fired: no schematron reports fired.",
        "firedAssertionErrors": [],
        "firedSuccessfulReports": [],
        "firedAssertionErrorsCount": 0,
        "firedSuccessfulReportsCount": 0,
        "firedAssertionErrorCodes": []
      }
    },
    "firedAssertionErrorsCount": 2,
    "allAssertionErrorCodes": ["PEPPOL-EN16931-R007-AUNZ-SB", "PEPPOL-EN16931-R004-AUNZ

-SB"],
    "firedSuccessfulReportsCount": 0
  }
}
```

## Support/Help

For any questions related to the API, contact [yacine@ebsoftwareservices.com.au](mailto:yacine@ebsoftwareservices.com.au) or comment on this document.

For additional details, refer to the [Swagger Documentation](https://services.ebusiness-cloud.com/ess-schematron/swagger-ui/index.html).
