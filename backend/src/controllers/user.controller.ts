import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../models/index.js';

class UserContoller {
  async createUser(
    req: FastifyRequest<{ Body: { username: string; telegramId: number } }>,
    reply: FastifyReply,
  ) {
    try {
      // const player = this.
      const player = await User.create(req.body);
      return reply.code(201).send(player);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  }

  async getUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const players = await User.find().sort({ score: -1 });
      return players;
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch players' });
    }
  }

  async getUserById(req: FastifyRequest<{ Params: { telegramId: string } }>, reply: FastifyReply) {
    try {
      const player = await User.findById({ telegramId: Number(req.params.telegramId) });

      if (!player) {
        reply.code(404).send({ error: 'Player not found' });
        return;
      }
      return player;
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch player' });
    }
  }
}

export const userController = new UserContoller();
