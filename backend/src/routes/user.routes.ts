import { FastifyInstance } from 'fastify';
import { userController } from '../controllers/user.controller.js';

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/players', userController.getUsers);

  fastify.post('/players', userController.createUser);

  fastify.get('/players/:id', userController.getUserById);

  fastify.delete('/players/:id', async (req, reply) => {
    reply.code(501).send({ error: 'Not implemented' });
  });
};
