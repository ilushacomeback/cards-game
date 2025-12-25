import Fastify from 'fastify';
import mongoose from 'mongoose';

const fastify = Fastify({
  logger: true,
});

// Конфигурация
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cards-game';
const PORT = Number(process.env.PORT) || 3000;

// Функция для безопасного получения db
function getDB() {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database not connected yet');
  }
  return db;
}

// Health check
fastify.get('/health', async () => {
  const isConnected = mongoose.connection.readyState === 1;
  return {
    status: isConnected ? 'OK' : 'STARTING',
    timestamp: new Date().toISOString(),
    mongodb: isConnected ? 'connected' : 'disconnected',
  };
});

fastify.get('/players', async (req, reply) => {
  try {
    const db = getDB();
    const players = await db.collection('players').find({}).toArray();
    return players;
  } catch (error: any) {
    reply.code(503); // Service Unavailable
    return { error: error.message };
  }
});

// Запуск
const start = async () => {
  try {
    console.log('🔄 Подключаюсь к MongoDB...');

    // 1. СНАЧАЛА подключаем БД
     await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB подключена');

    // 2. Проверяем что есть тестовые данные


    // 3. ЗАПУСКАЕМ сервер
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ Ошибка запуска:', err);
    process.exit(1);
  }
};

start();
