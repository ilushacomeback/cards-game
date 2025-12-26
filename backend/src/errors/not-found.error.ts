import { AppError, errorCode } from './app.error.js';

export class NotFoundError extends AppError {
  constructor(
    message = 'Resource not found',
    code: keyof typeof errorCode = errorCode.RESOURCE_NOT_FOUND,
  ) {
    super(message, 404, code);
  }
}
