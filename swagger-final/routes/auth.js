/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and registration
 *   - name: Password Management
 *     description: Password reset and management
 *   - name: User Management
 *     description: User account management
 *
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: 'user@example.com'
 *         password: 'password123'
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         _id:
 *           type: string
 *           description: The ID of the user
 *         googlePicture:
 *           type: string
 *           description: The URL to the user's Google picture
 *         gln:
 *           type: string
 *           description: The user's GLN
 *       example:
 *         username: 'john_doe'
 *         email: 'user@example.com'
 *         _id: '60d0fe4f5311236168a109ca'
 *         googlePicture: 'http://example.com/picture.jpg'
 *         gln: '123456789'
 *
 * /login:
 *   post:
 *     summary: User login
 *     description: Verifies user credentials and returns a JWT token if successful.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       201:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid Credential
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error, try again later
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *       example:
 *         username: 'john_doe'
 *         password: 'password123'
 *         email: 'user@example.com'
 *
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         _id:
 *           type: string
 *           description: The ID of the user
 *         googlePicture:
 *           type: string
 *           description: The URL to the user's Google picture
 *         gln:
 *           type: string
 *           description: The user's GLN
 *       example:
 *         username: 'john_doe'
 *         email: 'user@example.com'
 *         _id: '60d0fe4f5311236168a109ca'
 *         googlePicture: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
 *         gln: '123456789'
 *
 * /register:
 *   post:
 *     summary: User registration
 *     description: Creates a new user and returns a JWT token if successful.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email already in use
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error, try again later
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GoogleLoginRequest:
 *       type: object
 *       required:
 *         - googleId
 *         - email
 *         - username
 *         - googlePicture
 *       properties:
 *         googleId:
 *           type: string
 *           description: The Google ID of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         googlePicture:
 *           type: string
 *           description: The URL to the user's Google picture
 *       example:
 *         googleId: 'randomgoogleid'
 *         email: 'user@example.com'
 *         username: 'john_doe'
 *         googlePicture: 'http://example.com/picture.jpg'
 *
 *     GoogleLoginResponse:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         _id:
 *           type: string
 *           description: The ID of the user
 *         googlePicture:
 *           type: string
 *           description: The URL to the user's Google picture
 *         googleId:
 *           type: string
 *           description: The Google ID of the user
 *         gln:
 *           type: string
 *           description: The user's GLN
 *       example:
 *         username: 'john_doe'
 *         email: 'user@example.com'
 *         _id: '60d0fe4f5311236168a109ca'
 *         googlePicture: 'http://example.com/picture.jpg'
 *         googleId: 'randomgoogleid'
 *         gln: '123456789'
 *
 * /google-login:
 *   post:
 *     summary: Google Login
 *     description: Handles user login via Google OAuth.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoogleLoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoogleLoginResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user requesting password reset
 *       example:
 *         email: 'user@example.com'
 *
 *     ForgotPasswordResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message indicating the status of the password reset request
 *       example:
 *         message: 'OTP SENT TO user@example.com'
 *
 * /forgot-password:
 *   post:
 *     summary: Forgot Password
 *     description: Generates a password reset token and sends it to the user's email.
 *     tags: [Password Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: OTP sent to the user's email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordResponse'
 *       400:
 *         description: Bad request, email is required or retry after some time
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - token
 *         - newPassword
 *       properties:
 *         token:
 *           type: string
 *           description: The password reset token
 *         newPassword:
 *           type: string
 *           description: The new password for the user
 *       example:
 *         token: 'randomgeneratedtoken'
 *         newPassword: 'newPassword123'
 *
 *     ResetPasswordResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message indicating the status of the password reset
 *       example:
 *         message: 'Password reset successful'
 *
 * /reset-password:
 *   post:
 *     summary: Reset Password
 *     description: Resets the user's password using the provided token and new password.
 *     tags: [Password Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordResponse'
 *       400:
 *         description: Invalid or expired token, or user does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteUserAccountRequest:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         googleId:
 *           type: string
 *           description: The Google ID of the user (if applicable)
 *         username:
 *           type: string
 *           description: The username of the user (for Google users)
 *       example:
 *         userId: '60d0fe4f5311236168a109ca'
 *         password: 'password123'
 *         googleId: 'randomgoogleid'
 *         username: 'john_doe'
 *
 *     DeleteUserAccountResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message indicating the status of the user account deletion
 *       example:
 *         message: 'User account deleted successfully'
 *
 * /delete-user-account:
 *   delete:
 *     summary: Delete User Account
 *     description: Deletes a user account by verifying credentials.
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteUserAccountRequest'
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUserAccountResponse'
 *       400:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Invalid Password'
 *       401:
 *         description: Invalid username for Google users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Invalid username'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendFileRequest:
 *       type: object
 *       required:
 *         - to
 *         - subject
 *         - text
 *       properties:
 *         to:
 *           type: string
 *           description: The recipient email address
 *         subject:
 *           type: string
 *           description: The subject of the email
 *         text:
 *           type: string
 *           description: The text content of the email
 *         html:
 *           type: string
 *           description: The HTML content of the email (optional)
 *       example:
 *         to: 'recipient@example.com'
 *         subject: 'Test Email'
 *         text: 'This is a test email'
 *         html: '<h1>This is a test email</h1>'
 *
 * /sendFile:
 *   post:
 *     summary: Send Email
 *     description: Sends an email with the specified content.
 *     tags: [Email]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendFileRequest'
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendFileResponse'
 *       500:
 *         description: Failed to send email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
