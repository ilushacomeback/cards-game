import { FastifyInstance } from 'fastify';
import UserController from '../controllers/user.controller.ts';

export default async function userRoutes(fastify: FastifyInstance) {
  // GET /players - все игроки
  fastify.get('/players', UserController.getUsers);

  // POST /players - создать игрока
  fastify.post('/players', UserController.createUser);

  // GET /players/:id - игрок по ID
  fastify.get('/players/:id', UserController.getUserById);

  // DELETE /players/:id - удалить игрока
  fastify.delete('/players/:id', async (req, reply) => {
    // Можно и здесь писать логику, но лучше в контроллере
    reply.code(501).send({ error: 'Not implemented' });
  });
}