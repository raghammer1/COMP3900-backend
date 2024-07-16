/**
 * @swagger
 * components:
 *   schemas:
 *     ValidateUbl:
 *       type: object
 *       required:
 *         - UBL
 *       properties:
 *         UBL:
 *           type: string
 *           format: xml
 *           description: The UBL file to validate
 *       example:
 *         UBL: '<UBL><SomeContent>...</SomeContent></UBL>'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (Validation)
 *   description: The Invoice management service (Validation)
 * /validate-ubl:
 *   post:
 *     summary: Validate UBL
 *     tags: [E-invoicing (Validation)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/ValidateUbl'
 *     responses:
 *       200:
 *         description: Successful validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 validationResults:
 *                   type: object
 *                   description: The validation results in JSON format
 *                   example:
 *                     fileDetails:
 *                       fileName: "invoice_12345.xml"
 *                       fileType: "UBL Invoice"
 *                       submissionDate: "2024-06-13"
 *                       checkedBy: "[Your Company Name]"
 *                     validationSummary:
 *                       validationStatus: "Failed"
 *                       totalChecksPerformed: 15
 *                       checksPassed: 12
 *                       checksFailed: 3
 *                     detailedFindings:
 *                       generalInformation:
 *                         validationStatus: "Passed"
 *                         description: "The UBL file contains the required general information including invoice number, issue date, and supplier details."
 *                       businessIdentifier:
 *                         validationStatus: "Passed"
 *                         description: "The supplier's ABN (Australian Business Number) is present and correctly formatted."
 *                       buyerAndSellerInformation:
 *                         validationStatus: "Passed"
 *                         description: "The buyer and seller information is complete and includes names, addresses, and contact details."
 *                       invoiceCurrencyCode:
 *                         validationStatus: "Passed"
 *                         description: "The currency code is provided and correctly formatted as per ISO 4217 standards."
 *                       invoiceAmounts:
 *                         validationStatus: "Passed"
 *                         description: "The total invoice amount, including tax and net amount, is correctly calculated and presented."
 *                       taxInformation:
 *                         validationStatus: "Failed"
 *                         description: "The tax details are incomplete. The GST (Goods and Services Tax) amount is not specified."
 *                         expected: "GST amount should be specified as per Australian tax laws."
 *                         found: "Missing GST amount."
 *                       paymentTerms:
 *                         validationStatus: "Passed"
 *                         description: "Payment terms are clearly stated, including payment due date and any discount conditions."
 *                       lineItemDetails:
 *                         validationStatus: "Passed"
 *                         description: "Line item details are correctly provided, including item description, quantity, unit price, and total amount."
 *                       taxCategoryCode:
 *                         validationStatus: "Failed"
 *                         description: "The tax category code for line items is incorrect. It does not match the standard GST codes."
 *                         expected: "GST codes should be in accordance with Australian tax codes."
 *                         found: "Incorrect tax category code."
 *                       legalMonetaryTotal:
 *                         validationStatus: "Passed"
 *                         description: "The legal monetary total, including total amount payable, is correctly calculated and displayed."
 *                       allowancesAndCharges:
 *                         validationStatus: "Passed"
 *                         description: "Any allowances and charges are correctly documented and included in the invoice total."
 *                       buyerReference:
 *                         validationStatus: "Passed"
 *                         description: "Buyer reference is present and correctly formatted."
 *                       deliveryInformation:
 *                         validationStatus: "Passed"
 *                         description: "Delivery details, including delivery address and date, are correctly provided."
 *                       additionalSupportingDocuments:
 *                         validationStatus: "Failed"
 *                         description: "Supporting documents such as purchase order references are missing."
 *                         expected: "References to supporting documents should be included."
 *                         found: "Missing purchase order references."
 *                       signature:
 *                         validationStatus: "Passed"
 *                         description: "Digital signature is present and valid."
 *                     recommendations:
 *                       - "Ensure the GST amount is specified in the invoice."
 *                       - "Verify and correct the tax category codes to comply with Australian standards."
 *                       - "Include references to supporting documents such as purchase orders to comply with e-invoicing requirements."
 *                     conclusion:
 *                       text: "The UBL invoice file has failed the validation against Australian e-invoicing laws due to missing GST amount, incorrect tax category codes, and missing supporting documents. Please rectify the identified issues and resubmit the invoice for validation."
 *                     reportGeneratedBy: "[Your Company Name]"
 *                     reportDate: "2024-06-13"
 *                 validation-doc-id:
 *                   type: string
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           text/html:
 *             schema:
 *               type: string
 *               format: html
 *       400:
 *         description: Validation failed for the UBL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation failed for the UBL
 *                 validationDetails:
 *                   type: array
 *                   items:
 *                     type: string
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           text/html:
 *             schema:
 *               type: string
 *               format: html
 *       404:
 *         description: Failed to validate UBL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to validate UBL
 *                 reasons:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error, please try again later
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RerunValidation:
 *       type: object
 *       required:
 *         - UBL-id
 *       properties:
 *         UBL-id:
 *           type: string
 *           description: The ID of the UBL to rerun validation for
 *       example:
 *         UBL-id: '123'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (Validation)
 *   description: The Invoice management service (Rerun Validation)
 * /rerun-validation:
 *   put:
 *     summary: Rerun validation for UBL
 *     tags: [E-invoicing (Validation)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RerunValidation'
 *     responses:
 *       200:
 *         description: Successful validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 validationResults:
 *                   type: object
 *                   description: The validation results in JSON format
 *                   example:
 *                     fileDetails:
 *                       fileName: "invoice_12345.xml"
 *                       fileType: "UBL Invoice"
 *                       submissionDate: "2024-06-13"
 *                       checkedBy: "[Your Company Name]"
 *                     validationSummary:
 *                       validationStatus: "Failed"
 *                       totalChecksPerformed: 15
 *                       checksPassed: 12
 *                       checksFailed: 3
 *                     detailedFindings:
 *                       generalInformation:
 *                         validationStatus: "Passed"
 *                         description: "The UBL file contains the required general information including invoice number, issue date, and supplier details."
 *                       businessIdentifier:
 *                         validationStatus: "Passed"
 *                         description: "The supplier's ABN (Australian Business Number) is present and correctly formatted."
 *                       buyerAndSellerInformation:
 *                         validationStatus: "Passed"
 *                         description: "The buyer and seller information is complete and includes names, addresses, and contact details."
 *                       invoiceCurrencyCode:
 *                         validationStatus: "Passed"
 *                         description: "The currency code is provided and correctly formatted as per ISO 4217 standards."
 *                       invoiceAmounts:
 *                         validationStatus: "Passed"
 *                         description: "The total invoice amount, including tax and net amount, is correctly calculated and presented."
 *                       taxInformation:
 *                         validationStatus: "Failed"
 *                         description: "The tax details are incomplete. The GST (Goods and Services Tax) amount is not specified."
 *                         expected: "GST amount should be specified as per Australian tax laws."
 *                         found: "Missing GST amount."
 *                       paymentTerms:
 *                         validationStatus: "Passed"
 *                         description: "Payment terms are clearly stated, including payment due date and any discount conditions."
 *                       lineItemDetails:
 *                         validationStatus: "Passed"
 *                         description: "Line item details are correctly provided, including item description, quantity, unit price, and total amount."
 *                       taxCategoryCode:
 *                         validationStatus: "Failed"
 *                         description: "The tax category code for line items is incorrect. It does not match the standard GST codes."
 *                         expected: "GST codes should be in accordance with Australian tax codes."
 *                         found: "Incorrect tax category code."
 *                       legalMonetaryTotal:
 *                         validationStatus: "Passed"
 *                         description: "The legal monetary total, including total amount payable, is correctly calculated and displayed."
 *                       allowancesAndCharges:
 *                         validationStatus: "Passed"
 *                         description: "Any allowances and charges are correctly documented and included in the invoice total."
 *                       buyerReference:
 *                         validationStatus: "Passed"
 *                         description: "Buyer reference is present and correctly formatted."
 *                       deliveryInformation:
 *                         validationStatus: "Passed"
 *                         description: "Delivery details, including delivery address and date, are correctly provided."
 *                       additionalSupportingDocuments:
 *                         validationStatus: "Failed"
 *                         description: "Supporting documents such as purchase order references are missing."
 *                         expected: "References to supporting documents should be included."
 *                         found: "Missing purchase order references."
 *                       signature:
 *                         validationStatus: "Passed"
 *                         description: "Digital signature is present and valid."
 *                     recommendations:
 *                       - "Ensure the GST amount is specified in the invoice."
 *                       - "Verify and correct the tax category codes to comply with Australian standards."
 *                       - "Include references to supporting documents such as purchase orders to comply with e-invoicing requirements."
 *                     conclusion:
 *                       text: "The UBL invoice file has failed the validation against Australian e-invoicing laws due to missing GST amount, incorrect tax category codes, and missing supporting documents. Please rectify the identified issues and resubmit the invoice for validation."
 *                     reportGeneratedBy: "[Your Company Name]"
 *                     reportDate: "2024-06-13"
 *                 validation-doc-id:
 *                   type: string
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           text/html:
 *             schema:
 *               type: string
 *               format: html
 *       400:
 *         description: Bad request errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation failed for the UBL
 *                 validationDetails:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Failed to validate UBL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to validate UBL
 *                 reasons:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error, please try again later
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (Validation)
 *   description: The Invoice management service (Validation)
 * /validation-report/{type}/{id}:
 *   get:
 *     summary: Get validation report for UBL (Report linked to pdf and ubl id)
 *     tags: [E-invoicing (Validation)]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ubl, pdf]
 *         description: The type of document (UBL or PDF)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the UBL or PDF
 *     responses:
 *       200:
 *         description: Successful retrieval of validation report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 validationResults:
 *                   type: object
 *                   description: The validation results in JSON format
 *                   example:
 *                     fileDetails:
 *                       fileName: "invoice_12345.xml"
 *                       fileType: "UBL Invoice"
 *                       submissionDate: "2024-06-13"
 *                       checkedBy: "[Your Company Name]"
 *                     validationSummary:
 *                       validationStatus: "Failed"
 *                       totalChecksPerformed: 15
 *                       checksPassed: 12
 *                       checksFailed: 3
 *                     detailedFindings:
 *                       generalInformation:
 *                         validationStatus: "Passed"
 *                         description: "The UBL file contains the required general information including invoice number, issue date, and supplier details."
 *                       businessIdentifier:
 *                         validationStatus: "Passed"
 *                         description: "The supplier's ABN (Australian Business Number) is present and correctly formatted."
 *                       buyerAndSellerInformation:
 *                         validationStatus: "Passed"
 *                         description: "The buyer and seller information is complete and includes names, addresses, and contact details."
 *                       invoiceCurrencyCode:
 *                         validationStatus: "Passed"
 *                         description: "The currency code is provided and correctly formatted as per ISO 4217 standards."
 *                       invoiceAmounts:
 *                         validationStatus: "Passed"
 *                         description: "The total invoice amount, including tax and net amount, is correctly calculated and presented."
 *                       taxInformation:
 *                         validationStatus: "Failed"
 *                         description: "The tax details are incomplete. The GST (Goods and Services Tax) amount is not specified."
 *                         expected: "GST amount should be specified as per Australian tax laws."
 *                         found: "Missing GST amount."
 *                       paymentTerms:
 *                         validationStatus: "Passed"
 *                         description: "Payment terms are clearly stated, including payment due date and any discount conditions."
 *                       lineItemDetails:
 *                         validationStatus: "Passed"
 *                         description: "Line item details are correctly provided, including item description, quantity, unit price, and total amount."
 *                       taxCategoryCode:
 *                         validationStatus: "Failed"
 *                         description: "The tax category code for line items is incorrect. It does not match the standard GST codes."
 *                         expected: "GST codes should be in accordance with Australian tax codes."
 *                         found: "Incorrect tax category code."
 *                       legalMonetaryTotal:
 *                         validationStatus: "Passed"
 *                         description: "The legal monetary total, including total amount payable, is correctly calculated and displayed."
 *                       allowancesAndCharges:
 *                         validationStatus: "Passed"
 *                         description: "Any allowances and charges are correctly documented and included in the invoice total."
 *                       buyerReference:
 *                         validationStatus: "Passed"
 *                         description: "Buyer reference is present and correctly formatted."
 *                       deliveryInformation:
 *                         validationStatus: "Passed"
 *                         description: "Delivery details, including delivery address and date, are correctly provided."
 *                       additionalSupportingDocuments:
 *                         validationStatus: "Failed"
 *                         description: "Supporting documents such as purchase order references are missing."
 *                         expected: "References to supporting documents should be included."
 *                         found: "Missing purchase order references."
 *                       signature:
 *                         validationStatus: "Passed"
 *                         description: "Digital signature is present and valid."
 *                     recommendations:
 *                       - "Ensure the GST amount is specified in the invoice."
 *                       - "Verify and correct the tax category codes to comply with Australian standards."
 *                       - "Include references to supporting documents such as purchase orders to comply with e-invoicing requirements."
 *                     conclusion:
 *                       text: "The UBL invoice file has failed the validation against Australian e-invoicing laws due to missing GST amount, incorrect tax category codes, and missing supporting documents. Please rectify the identified issues and resubmit the invoice for validation."
 *                     reportGeneratedBy: "[Your Company Name]"
 *                     reportDate: "2024-06-13"
 *       404:
 *         description: No validation report found for the provided ID
 *       500:
 *         description: Server error, please try again later
 */
