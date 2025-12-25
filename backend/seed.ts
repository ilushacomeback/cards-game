import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/cards-game';

export const getDB = () => {
  const db = mongoose.connection.db;
  if (!db) throw new Error('Database not ready');
  return db;
};

async function seed() {
  await mongoose.connect(MONGODB_URI);

  const db = getDB();
  // Очищаем старые данные
  await db.collection('players').deleteMany({});

  // Добавляем тестовых игроков
  await db.collection('players').insertMany([
    { name: 'Илья', score: 100, level: 1 },
    { name: 'Анна', score: 85, level: 2 },
    { name: 'Макс', score: 120, level: 3 },
  ]);

  console.log('✅ Тестовые данные созданы!');
  console.log('Игроки: Илья (100), Анна (85), Макс (120)');

  mongoose.disconnect();
}

seed().catch(console.error);
