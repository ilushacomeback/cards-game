import Fastify, { FastifyInstance } from 'fastify';
import { connectDB } from './config/database';
import playerRoutes from './routes/user.routes'
// import gameRoutes from './routes/game.routes';

export const createApp = (): FastifyInstance => {
  const app = Fastify({ logger: true });

  // Регистрация роутов
  app.register(playerRoutes, { prefix: '/api' });
  // app.register(gameRoutes, { prefix: '/api' });

  // Health check
  app.get('/health', async () => ({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mongodb: app.mongoose?.connection?.readyState === 1 ? 'connected' : 'disconnected',
  }));

  return app;
};

// Добавляем mongoose в типы Fastify
declare module 'fastify' {
  interface FastifyInstance {
    mongoose?: typeof import('mongoose');
  }
}
