import { FastifyReply } from 'fastify';
import { authUseCase } from '../usecases/auth.usecase.js';
import { TypedRequest } from './types/request.js';

class AuthContoller {
  async login(req: TypedRequest<{ Body: { initData: string } }>, reply: FastifyReply) {
    const { access, refresh } = req.cookies;
    const user = await authUseCase.loginWithTelegram(req.body.initData, { access, refresh });

    if (user.tokens) {
      const { accessToken, refreshToken } = user.tokens;
      reply.setCookie('access', accessToken);
      reply.setCookie('refresh', refreshToken);
    }

    return reply.code(201).send(user.user);
  }
}

export const authController = new AuthContoller();
