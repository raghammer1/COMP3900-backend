export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%*&^]/;
  const hasUppercase = /[A-Z]/;

  if (password.length < minLength) return false;
  if (!hasNumber.test(password)) return false;
  if (!hasSpecialChar.test(password)) return false;
  if (!hasUppercase.test(password)) return false;

  return true;
};
