import { ValidationResult } from '../../../Domain/types/ValidationResult';

export function dataValidationAuth(username?: string, password?: string): ValidationResult {
  if (!username || !password) {
    return { success: false, message: 'Username and password are required.' };
  }

  if (username.length < 3) {
    return { success: false, message: 'Username must have at least 3 characters.' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }

  if (password.length > 20) {
    return { success: false, message: 'Password cannot exceed 20 characters.' };
  }

  return { success: true };
}