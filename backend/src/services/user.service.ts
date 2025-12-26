import { Types } from 'mongoose';
import { User, IUser } from '../models/index.js';
import { Token } from '../models/token.model.js';

export interface IUserService {
  findOrCreateTelegramUser(data: {
    telegramId: number;
    firstName?: string;
    username?: string;
  }): Promise<IUser>;

  findUserByTelegramId(telegramId: number): Promise<IUser | null>;

  findUserByDBId(id: Types.ObjectId): Promise<IUser | null>;

  getTopUsers(limit?: number): Promise<IUser[]>;

  // updateUser(telegramId: number, updates: Partial<IUser>): Promise<IUser | null>;

  // addCards(telegramId: number, cardIds: string[]): Promise<IUser | null>;

  // getPlayerStats(telegramId: number): Promise<{
  //   telegramId: number;
  //   firstName: string;
  //   score: number;
  //   level: number;
  //   balance: number;
  //   cardsCount: number;
  //   winRate: number;
  //   gamesPlayed: number;
  //   lastActive: Date | undefined;
  // } | null>;
}

export class UserService {
  async findOrCreateTelegramUser(data: {
    telegramId: number;
    firstName?: string;
    username?: string;
  }): Promise<IUser> {
    const existing = await this.findUserByTelegramId(data.telegramId);

    if (existing) {
      return existing;
    }

    return await User.create({
      telegramId: data.telegramId,
      firstName: data.firstName,
      username: data.username,
      balance: 1000,
      score: 0,
      cards: [],
      gamesPlayed: 0,
      gamesWon: 0,
      level: 1,
      lastActive: new Date(),
    });
  }

  async findUserByTelegramId(telegramId: number): Promise<IUser | null> {
    return await User.findOne({ telegramId });
  }

  async findUserByDBId(id: Types.ObjectId): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return await User.findById(id);
  }

  // Получить топ игроков
  async getTopUsers(limit: number = 100) {
    return await User.find()
      .sort({ score: -1 })
      .limit(limit)
      .select('telegramId firstName username score level');
  }

  // // Обновить данные
  // async updateUser(telegramId: number, updates: Partial<IUser>): Promise<IUser | null> {
  //   return await User.findOneAndUpdate(
  //     { telegramId },
  //     { ...updates, lastActive: new Date() },
  //     { new: true },
  //   );
  // }

  // // Добавить карты игроку
  // async addCards(telegramId: number, cardIds: string[]) {
  //   return await User.findOneAndUpdate(
  //     { telegramId },
  //     { $push: { cards: { $each: cardIds } } },
  //     { new: true },
  //   );
  // }

  // // Получить статистику
  // async getPlayerStats(telegramId: number) {
  //   const player = await this.findUserByTelegramId(telegramId);
  //   if (!player) return null;

  //   const winRate =
  //     player.gamesPlayed > 0 ? Math.round((player.gamesWon / player.gamesPlayed) * 100) : 0;

  //   return {
  //     telegramId: player.telegramId,
  //     firstName: player.firstName,
  //     score: player.score,
  //     level: player.level,
  //     balance: player.balance,
  //     cardsCount: player.cards.length,
  //     // deckCount: player.deck.length,
  //     winRate,
  //     gamesPlayed: player.gamesPlayed,
  //     lastActive: player.lastActive,
  //   };
  // }
}

export const userService = new UserService();
