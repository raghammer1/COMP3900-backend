/**
 * @swagger
 * components:
 *   schemas:
 *     ConvertPdfToUbl:
 *       type: object
 *       required:
 *         - PDF
 *       properties:
 *         PDF:
 *           type: string
 *           format: binary
 *           description: The PDF file to convert
 *       example:
 *         PDF: 'Binary string of the PDF file'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (PDF to UBL)
 *   description: The Invoice management service (Conversion)
 * /convert-pdf-to-ubl:
 *   post:
 *     summary: Convert PDF to UBL
 *     tags: [E-invoicing (PDF to UBL)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/octet-stream:
 *           schema:
 *             $ref: '#/components/schemas/ConvertPdfToUbl'
 *     responses:
 *       200:
 *         description: Successful conversion
 *         content:
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 UBL:
 *                   type: string
 *                   format: xml
 *                 UBL-id:
 *                   type: string
 *                 PDF-id:
 *                   type: string
 *       400:
 *         description: Insufficient data in the PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Insufficient data in the PDF, please add more information
 *                 requiredInformation:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Failed to convert PDF to UBL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to convert PDF to UBL
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
