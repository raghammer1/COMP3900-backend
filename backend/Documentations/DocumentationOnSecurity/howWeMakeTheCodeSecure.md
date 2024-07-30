# Security Documentation

## Overview

This document provides a detailed description of the security measures implemented in our application. It covers user authentication, password management, token handling, and overall security practices to ensure the safety and integrity of user data.

## Authentication and Authorization

### User Login

**Process:**

1. User submits login credentials (email and password).
2. The email is converted to lowercase and checked against the database.
3. If a user with the provided email exists, the submitted password is compared with the stored hashed password using bcrypt.
4. If the password is correct, a JWT token is generated and signed with a secret key, expiring in 24 hours.
5. The token is stored in an HTTP-only cookie to prevent access from JavaScript, reducing the risk of XSS attacks.
6. The user is authenticated and granted access to the application.

**Security Measures:**

- **Password Hashing:** Uses bcrypt to hash passwords with a salt factor of 10, ensuring secure storage.
- **Token Expiration:** JWT tokens expire after 24 hours to limit the duration of validity.
- **HTTP-only Cookies:** Tokens are stored in cookies that are inaccessible via JavaScript to mitigate XSS attacks.

### User Registration

**Process:**

1. User submits registration details (username, password, and email).
2. The email is converted to lowercase and checked to ensure it is not already in use.
3. The password is hashed using bcrypt before storing it in the database.
4. A new user record is created and saved in the database.
5. A JWT token is generated and signed with a secret key, expiring in 24 hours.
6. The token is stored in an HTTP-only cookie to prevent access from JavaScript.

**Security Measures:**

- **Email Uniqueness:** Checks if the email is already registered to prevent duplicate accounts.
- **Password Hashing:** Ensures passwords are securely stored using bcrypt.
- **Token Expiration:** Limits the session duration by setting a 24-hour expiration on JWT tokens.
- **HTTP-only Cookies:** Protects tokens from being accessed via JavaScript.

## Password Reset

### Forgot Password

**Process:**

1. User submits their email for password reset.
2. The email is validated to ensure it is provided.
3. The application checks if the email exists in the user database.
4. A unique OTP token is generated using a secure random method.
5. The token and email are stored in the database with a creation timestamp.
6. An email with the reset link containing the token is sent to the user.

**Security Measures:**

- **Email Validation:** Ensures that a valid email is provided.
- **Token Generation:** Uses a secure random method to generate unique tokens.
- **Token Expiration:** Tokens are set to expire after 90 seconds to minimize misuse.
- **Email Notifications:** Users receive an email with a secure link to reset their password.

### Reset Password

**Process:**

1. User submits the OTP token and new password.
2. The application checks the validity and expiration of the token.
3. If valid, the new password is hashed using bcrypt and updated in the database.
4. The OTP record is deleted from the database after a successful password reset.

**Security Measures:**

- **Token Validation:** Ensures tokens are valid and not expired before allowing password reset.
- **Password Hashing:** New passwords are hashed using bcrypt before storing.
- **Token Expiration:** Tokens expire after 90 seconds to enhance security.

## Token Verification

**Process:**

1. The application middleware checks for a JWT token in the user's cookies.
2. The token is verified using the secret key.
3. If valid, the token payload is attached to the request object, allowing the user to proceed.

**Security Measures:**

- **Token Validation:** Ensures only valid tokens are accepted.
- **Token Expiration:** Tokens expire after 24 hours, limiting session duration.
- **HTTP-only Cookies:** Tokens are stored in cookies that are inaccessible via JavaScript.

## Security Measures

### Password Encryption

- **bcrypt.js:** Passwords are hashed using bcrypt with a salt factor of 10 to ensure secure storage and make it computationally infeasible to reverse the hash.

### JWT Token

- **jsonwebtoken:** JWT tokens are used for user authentication, ensuring that only authenticated users can access certain endpoints. Tokens are signed with a secret key and have an expiration time of 24 hours.

### Secure Cookies

- **HTTP Only Cookies:** JWT tokens are stored in HTTP-only cookies to prevent access from JavaScript, reducing the risk of XSS attacks.
- **Expiration:** Cookies are set to expire after 24 hours, ensuring that sessions are not indefinitely valid.

### Token Expiration

- **OTP Expiration:** One-Time Passwords for password reset requests are set to expire after 90 seconds, reducing the window of opportunity for misuse.

### Error Handling

- **Consistent Error Messages:** Error messages are consistently returned for invalid credentials, server errors, and expired or invalid tokens to avoid leaking sensitive information.

### Email Security

- **Email Validation:** Validates email format and existence before processing requests.
- **Email Notifications:** Sends secure email notifications for password resets with time-limited links.

## Conclusion

By implementing these security measures, we ensure that our application provides a safe and secure environment for users to manage their e-invoicing tasks. These practices help protect user data, maintain the integrity of user sessions, and prevent unauthorized access.

```

This documentation outlines the security practices and measures implemented in our e-invoicing application, explaining how user data is protected throughout the authentication, registration, password reset, and session management processes.
```
