# Veryfi API Documentation for PDF Invoice to JSON Conversion

## Overview

This documentation provides detailed steps to use the Veryfi API for converting PDF invoices to JSON. This process allows for further conversion of the extracted JSON data into UBL (Universal Business Language) format. The Veryfi API uses OCR (Optical Character Recognition) to extract data from various document formats and convert them into structured JSON data.

## API Endpoint

### Process a Document

**POST** `https://api.veryfi.com/api/v7/partner/documents`

Veryfi's Process Documents endpoint allows you to submit and extract data from unstructured documents into valuable business insights. The endpoint supports the following file formats: `.jpg, .ofd, .gif, .jpeg, .zip, .html, .png, .htm, .pdf, .webp, .heif, .txt, .avif, .heic`. The maximum file size is 20 MB, and the maximum number of pages that can be processed at once is 15.

## Request Formats

### Content Types

- `application/json`
- `multipart/form-data`

### Request Parameters

#### Body Parameters

- **file_data** (string): Base64 encoded string of the document. Least effective method.
- **file_url** (string): URL to a publicly accessible document for processing.
- **file_urls** (string[]): Array of URLs to publicly accessible documents.
- **package_path** (string): Path to a file in an S3 bucket.
- **bucket** (string): S3 bucket for `package_path`.
- **file_name** (string): Optional filename to help determine file type.
- **file** (binary): Binary file. Fastest way to process documents.
- **bounding_boxes** (boolean): Include bounding box data in the response.
- **confidence_details** (boolean): Include confidence scores in the response.
- **categories** (string[]): Comma-separated list of custom categories.
- **tags** (string[]): User-defined list of identifiers for categorizing documents.
- **max_pages_to_process** (integer): Number of pages to process. Default is 15.
- **boost_mode** (boolean): Enable boost mode for faster processing by skipping data enrichment steps.
- **external_id** (string): Custom ID for documents. Useful for mapping to external resources.
- **async** (boolean): Process files asynchronously using webhooks.
- **parse_address** (boolean): Break an address into individual components.
- **compute** (boolean): Include data enrichments to provide high extraction coverage.
- **country** (string): Country code to help recognize the document's currency.

## Responses

### Status Codes

- **201**: Document processed successfully.
- **400**: Bad request. Check your input parameters.
- **404**: Resource not found.
- **429**: Too many requests. Rate limit exceeded.
- **499**: Client closed request.
- **503**: Service unavailable. Try again later.
- **default**: Other errors.

### Response Fields

- **pdf_url** (uri): Signed URL to access the auto-generated PDF. Expires after 15 minutes.
- **id** (integer): Unique identifier for the document.
- **created_date** (date-time): Date and time the document was first submitted and processed.
- **updated_date** (date-time): Date and time of the last update to the document.
- **accounting_entry_type** (string): Type of accounting entry (debit, credit).
- **custom_fields** (object): Custom fields for the document.
- **duplicate_of** (integer): ID of the original document if identified as a duplicate.
- **exch_rate** (number): Exchange rate used for currency conversion.
- **external_id** (string): Custom identification value.
- **img_blur** (boolean): Indicates if the image is blurry.
- **img_file_name** (string): Filename and extension of the submitted document.
- **img_url** (uri): Signed URL to the original submitted image.
- **img_thumbnail_url** (uri): Signed URL to a thumbnail of the submitted image.
- **is_approved** (boolean): User-defined flag for the document.
- **is_blurry** (boolean[]): Array indicating if each page is blurry.
- **is_document** (boolean): Indicates if the image is a receipt, invoice, or other supported document.
- **is_duplicate** (boolean): Indicates if the document is a duplicate.
- **line_items** (object[]): Extracted line items from the document.
- **model** (string): Data extraction model version used.
- **notes** (string): User-defined text field for additional information.
- **ocr_text** (string): OCR text extracted from the document.
- **reference_number** (string): Deprecated. Use `id`.
- **status** (string): Document status (`in_progress`, `processed`, `reviewed`, `reimbursed`, `archived`).
- **tags** (string[]): User-defined tags for the document.
- **total_pages** (integer): Deprecated. Use `meta.total_pages`.
- **warnings** (string[]): Array of warnings for unusual behavior in the document.
- **meta** (object): Additional metadata for the document.

## Authentication

### Headers

- **CLIENT-ID**: Your Veryfi API client ID.
- **AUTHORIZATION**: Your Veryfi API key.

## Example Request

### Using cURL

```bash
curl -L -X POST 'https://api.veryfi.com/api/v7/partner/documents' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'CLIENT-ID: <API_KEY_VALUE>' \
-H 'AUTHORIZATION: <API_KEY_VALUE>' \
--data-raw '{
  "file_data": "string",
  "file_url": "string",
  "file_urls": [
    "string"
  ],
  "package_path": "string",
  "bucket": "string",
  "file_name": "string",
  "bounding_boxes": true,
  "confidence_details": true,
  "categories": [
    "string"
  ],
  "tags": [
    "string"
  ],
  "max_pages_to_process": 0,
  "boost_mode": false,
  "external_id": "string",
  "async": false,
  "parse_address": false,
  "compute": true,
  "country": "JO"
}'
```

### Using Node.js

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Veryfi API credentials
const client_id = 'your_client_id';
const client_secret = 'your_client_secret';
const username = 'your_username';
const api_key = 'your_api_key';

// Endpoint URL for uploading documents
const url = 'https://api.veryfi.com/api/v7/partner/documents/';

// Headers
const headers = {
  Accept: 'application/json',
  'CLIENT-ID': client_id,
  AUTHORIZATION: `apikey ${username}:${api_key}`,
  'X-Veryfi-Client-Id': client_id,
  'X-Veryfi-Client-Secret': client_secret,
};

async function uploadInvoice(fileBuffer, fileName) {
  try {
    const formData = new FormData();
    formData.append('file', fileBuffer, { filename: fileName });

    // Include headers from formData in the request
    const formHeaders = formData.getHeaders();

    const response = await axios.post(url, formData, {
      headers: { ...headers, ...formHeaders },
    });
    console.log('Conversion successful!');
    return response.data; // JSON representation of your invoice
  } catch (error) {
    console.error('Failed to convert PDF to JSON:', error.response.status);
    console.error(error.response.data);
    return null;
  }
}

module.exports = uploadInvoice;
```

## Interactive API

Access real-time capabilities and automatically populate your credentials by signing in to Veryfi.

### Base URL

`https://api.veryfi.com`

### Authentication

- **ClientId**: Your Veryfi Client ID
- **Authorization**: Your Veryfi API key

## Sending API Request

Click the Send API Request button in the Veryfi dashboard to see the response in real time.

## Conclusion

Using the Veryfi API to convert PDF invoices to JSON provides a streamlined and efficient way to process and extract data from invoices. This extracted JSON data can then be easily converted into UBL format, facilitating better business operations and data management.
