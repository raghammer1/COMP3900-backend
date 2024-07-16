/**
 * @swagger
 * tags:
 *   name: E-invoicing (PDF Handling)
 *   description: Get PDFs and UBLs related to a user
 * /get-pdf-ubl/{userId}:
 *   get:
 *     summary: Get all PDFs and UBLs related to a user
 *     tags: [E-invoicing (PDF Handling)]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successful retrieval of PDFs and UBLs
 *         content:
 *           application/json:
 *             example:
 *               pdfs:
 *                 - id: 'pdf-id-here-so-that-ubl-can-be-fetched-when-required'
 *                   url: 'https://example.com/pdf1 (LINK TO PDF)'
 *                 - id: '2'
 *                   url: 'https://example.com/pdf2'
 *       404:
 *         description: No PDFs or UBLs found for the user
 *       500:
 *         description: Server error, please try again later
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteUblPdf:
 *       type: object
 *       required:
 *         - UBL-id
 *         - PDF-id
 *       properties:
 *         UBL-id:
 *           type: string
 *           description: The ID of the UBL to delete
 *         PDF-id:
 *           type: string
 *           description: The ID of the PDF to delete
 *       example:
 *         UBL-id: '123'
 *         PDF-id: '456'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (PDF Handling)
 *   description: The Invoice management service (Deletion)
 * /delete-pdf-ubl:
 *   delete:
 *     summary: Delete UBL and PDF
 *     tags: [E-invoicing (PDF Handling)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteUblPdf'
 *     responses:
 *       200:
 *         description: Successfully deleted UBL and PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UBL-id:
 *                   type: string
 *                   example: '123'
 *                 PDF-id:
 *                   type: string
 *                   example: '456'
 *                 message:
 *                   type: string
 *                   example: Successfully deleted UBL and PDF
 *       400:
 *         description: Bad request errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ["UBL Id does not exist", "PDF Id does not exist", "Unable to delete UBL"]
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 'As errors'
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
