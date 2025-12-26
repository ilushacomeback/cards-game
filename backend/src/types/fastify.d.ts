import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    mongoose?: typeof import('mongoose');
  }
}
