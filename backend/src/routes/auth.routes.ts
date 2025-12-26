import { FastifyInstance } from 'fastify';
import { authController } from '../controllers/auth.controller.js';

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: { initData: string } }>('/login', authController.login);
};
