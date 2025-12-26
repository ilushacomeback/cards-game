import { FastifyInstance } from 'fastify';
import { AppError, errorCode } from '../errors/app.error.js';

export const errorHandlerPlugin = async (app: FastifyInstance) => {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      app.log.warn({ error }, 'AppError thrown');

      if (error.code === errorCode.USER_NOT_FOUND || error.code === errorCode.REFRESH_INVALID) {
        reply.clearCookie('access');
        reply.clearCookie('refresh');
      }

      return reply.status(error.statusCode).send({
        message: error.message,
        code: error.code,
      });
    } else {
      app.log.error({ error }, 'Unhandled error');
      return reply.status(500).send({
        message: 'Internal Server Error',
        code: errorCode.INTERNAL,
      });
    }
  });
};
