/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - token
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *         token:
 *           type: string
 *           description: A token with valid time of 8hrs sent as cookies
 *       example:
 *         email: 'user@example.com'
 *         password: 'password123'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (Authentication)
 *   description: The Invoice management service (Authentication)
 * /login:
 *   post:
 *     summary: Logs registered user into the website
 *     tags: [E-invoicing (Authentication)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A token with valid time of 8hrs sent as cookies
 *                   example: 'a-sha256-token-signed-with-user-creds'
 *                 user:
 *                   $ref: '#/components/schemas/Login'
 *       400:
 *         description: Invalid Email or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid Email or password
 *       500:
 *         description: Some server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Please try again later
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - password-check
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *         password-check:
 *           type: string
 *       example:
 *         email: 'user@example.com'
 *         password: 'password123'
 *         password-check: 'password123'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (Authentication)
 *   description: The Invoice management service (Authentication)
 * /register:
 *   post:
 *     summary: Logs registered user into the website
 *     tags: [E-invoicing (Authentication)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A token with valid time of 8hrs sent as cookies
 *                   example: 'a-sha256-token-signed-with-user-creds'
 *                 user:
 *                   $ref: '#/components/schemas/Login'
 *       400:
 *         description: Invalid Email or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid Email or password
 *       402:
 *         description: Passwords do not match
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Passwords do not match
 *       500:
 *         description: Some server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Please try again later
 */
