import Fastify from 'fastify';
import mongoose from 'mongoose';
const fastify = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
});
// Конфигурация
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fastifydb';
const PORT = Number(process.env.PORT) || 3000;
// Подключение к БД
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});
// Регистрируем роуты
// fastify.register(userRoutes, { prefix: '/api' });
// Health check

fastify.get('/health', async () => {
    return {
        status: 'OK',
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    };
});
// Запуск
const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: '0.0.0.0' });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map