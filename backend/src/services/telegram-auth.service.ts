import { validate, parse } from '@telegram-apps/init-data-node';
import type { InitData } from '@telegram-apps/init-data-node';
import { envConfig } from '../config/env.config.js';
import { ValidationError } from '../errors/validation.error.js';

export interface ITelegramAuthService {
  validateAndParse(initData: string): InitData;
}

export class TelegramAuthService implements ITelegramAuthService {
  constructor(private readonly botToken: string) {}

  validateAndParse(initData: string) {
    try {
      validate(initData, this.botToken, { expiresIn: 5 * 60 });
      return parse(initData);
    } catch (err) {
      throw new ValidationError('Invalid Telegram data');
    }
  }
}

export const telegramAuthService = new TelegramAuthService(envConfig.TOKEN_TG_APP);
