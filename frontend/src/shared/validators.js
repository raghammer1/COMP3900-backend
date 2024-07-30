// Function to validate email addresses using a regular expression
export function validateEmail(email) {
  // Regular expression to match a valid email format
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email); // Test the email against the regex and return true if it matches, false otherwise
}

// Function to validate passwords based on certain criteria
export const validatePassword = (password) => {
  const minLength = 8; // Minimum length of the password
  const hasNumber = /\d/; // Regular expression to check for at least one number
  const hasSpecialChar = /[!@#$%*&^]/; // Regular expression to check for at least one special character
  const hasUppercase = /[A-Z]/; // Regular expression to check for at least one uppercase letter

  // Check if the password meets all the criteria
  if (password.length < minLength) return false; // Check if the password is at least 8 characters long
  if (!hasNumber.test(password)) return false; // Check if the password contains at least one number
  if (!hasSpecialChar.test(password)) return false; // Check if the password contains at least one special character
  if (!hasUppercase.test(password)) return false; // Check if the password contains at least one uppercase letter

  return true; // If all criteria are met, return true
};
