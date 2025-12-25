import { User, IUser } from '../models';

export class UserService {
  // Создать игрока
  async createUser(data: {
    telegramId: number;
    firstName: string;
    username?: string;
  }): Promise<IUser> {
    const existing = await this.findUserByTelegramId(data.telegramId);
    if (existing) {
      throw new Error('Player already exists');
    }

    return await User.create({
      ...data,
      balance: 1000,
      score: 0,
      cards: [],
      gamesPlayed: 0,
      gamesWon: 0,
      level: 1,
    });
  }

  // Найти по telegramId
  async findUserByTelegramId(telegramId: number): Promise<IUser | null> {
    return await User.findOne({ telegramId });
  }

  // Получить топ игроков
  async getTopUsers(limit: number = 100) {
    return await User.find()
      .sort({ score: -1 })
      .limit(limit)
      .select('telegramId firstName username score level');
  }

  // Обновить данные
  async updateUser(telegramId: number, updates: Partial<IUser>): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { telegramId },
      { ...updates, lastActive: new Date() },
      { new: true },
    );
  }

  // Добавить карты игроку
  async addCards(telegramId: number, cardIds: string[]) {
    return await User.findOneAndUpdate(
      { telegramId },
      { $push: { cards: { $each: cardIds } } },
      { new: true },
    );
  }

  // Получить статистику
  async getPlayerStats(telegramId: number) {
    const player = await this.findUserByTelegramId(telegramId);
    if (!player) return null;

    const winRate =
      player.gamesPlayed > 0 ? Math.round((player.gamesWon / player.gamesPlayed) * 100) : 0;

    return {
      telegramId: player.telegramId,
      firstName: player.firstName,
      score: player.score,
      level: player.level,
      balance: player.balance,
      cardsCount: player.cards.length,
      // deckCount: player.deck.length,
      winRate,
      gamesPlayed: player.gamesPlayed,
      lastActive: player.lastActive,
    };
  }
}
