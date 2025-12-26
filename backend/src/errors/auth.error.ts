import { AppError, errorCode } from './app.error.js';

export class AuthError extends AppError {
  constructor(
    message = 'Authentication failed',
    code: keyof typeof errorCode = errorCode.AUTH_ERROR,
  ) {
    super(message, 401, code);
  }
}
