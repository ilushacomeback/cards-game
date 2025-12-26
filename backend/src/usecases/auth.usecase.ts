import { TelegramDataDTO } from '../controllers/dtos/telegram-data.dto.js';
import { AuthError } from '../errors/auth.error.js';
import { ValidationError } from '../errors/validation.error.js';
import { ITelegramAuthService, telegramAuthService } from '../services/telegram-auth.service.js';
import { tokenService, ITokenService } from '../services/token.serivce.js';
import { userService, IUserService } from '../services/user.service.js';
import { errorCode } from '../errors/app.error.js';

class AuthUseCase {
  constructor(
    private telegramService: ITelegramAuthService,
    private tokenService: ITokenService,
    private userService: IUserService,
  ) {}

  async loginWithTelegram(initData: string, cookiesTokens?: { access?: string; refresh?: string }) {
    const { access } = cookiesTokens ?? {};

    if (access) {
      const decodedToken = this.tokenService.verifyToken({ token: access, isRefresh: false });
      const user = await this.userService.findUserByDBId(decodedToken.dbId);

      if (!user) throw new AuthError('user not found', errorCode.USER_NOT_FOUND);

      return { user };
    }

    const telegramData = this.telegramService.validateAndParse(initData);
    if (!telegramData.user) throw new AuthError('user not found', errorCode.USER_NOT_FOUND);
    
    const userData = new TelegramDataDTO(telegramData.user);

    const user = await this.userService.findOrCreateTelegramUser(userData);
    const tokens = this.tokenService.generateTokens({
      dbId: user._id,
      username: user.username,
      telegramId: user.telegramId,
    });

    return { user, tokens };
  }
}

export const authUseCase = new AuthUseCase(telegramAuthService, tokenService, userService);
