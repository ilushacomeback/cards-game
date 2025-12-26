import { User } from '@telegram-apps/init-data-node';

export class TelegramDataDTO {
  public telegramId: number;
  public username?: string;
  public firstname?: string;
  public photoUrl?: string;

  constructor(user: User) {
    this.telegramId = user.id;
    this.username = user.username;
    this.firstname = user.first_name;
    this.photoUrl = user.photo_url;
  }
}
