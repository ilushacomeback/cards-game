import { AppError, errorCode } from './app.error.js';

export class ValidationError extends AppError {
  constructor(
    message = 'Validation failed',
    code: keyof typeof errorCode = errorCode.VALIDATION_ERROR,
  ) {
    super(message, 400, code);
  }
}
