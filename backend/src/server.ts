import mongoose from 'mongoose';
import { createApp } from './app.js';

const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cards-game';

const start = async () => {
  try {
    console.log('🔄 Подключаюсь к MongoDB...');
    await mongoose.connect(MONGODB_URI, { dbName: 'cards-game' });
    console.log('✅ MongoDB подключена');

    const app = createApp();

    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ Ошибка запуска:', err);
    process.exit(1);
  }
};

start();
