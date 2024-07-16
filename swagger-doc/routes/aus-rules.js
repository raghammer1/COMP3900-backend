/**
 * @swagger
 * tags:
 *   name: E-invoicing (Rules)
 *   description: The Invoice management service (Rules)
 * /e-invoicing-rules:
 *   get:
 *     summary: Get E-Invoicing Rules
 *     tags: [E-invoicing (Rules)]
 *     responses:
 *       200:
 *         description: Successful retrieval of E-Invoicing Rules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rules:
 *                   type: object
 *                   properties:
 *                     rule1:
 *                       type: string
 *                       example: 'Rule 1: lorem ispum'
 *                       description: The E-Invoicing rules
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           text/html:
 *             schema:
 *               type: string
 *               format: html
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
