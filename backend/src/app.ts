import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import { userRoutes } from './routes/user.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import { errorHandlerPlugin } from './plugins/error-handler.plugin.js';

export const createApp = () => {
  const app = Fastify({ logger: true });

  app.register(cookie);
;

  app.register(userRoutes, { prefix: '/api' });
  app.register(authRoutes, { prefix: '/api' });

  app.register(errorHandlerPlugin);

  // app.get('/health', async () => ({
  //   status: 'OK',
  //   timestamp: new Date().toISOString(),
  //   mongodb: app.mongoose?.connection?.readyState === 1 ? 'connected' : 'disconnected',
  // }));

  return app;
};
