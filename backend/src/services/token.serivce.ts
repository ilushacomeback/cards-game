import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { tokenConfig, TokenConfig } from '../config/token.config.js';
import { Types } from 'mongoose';
import { AuthError } from '../errors/auth.error.js';
import { Token } from '../models/token.model.js';
import { IUser } from '../models/user.model.js';
import { errorCode } from '../errors/app.error.js';

export interface TokenPayloadData extends JwtPayload {
  dbId: Types.ObjectId;
  telegramId: number;
  username?: string;
}

type GenerateToken = {
  payload: TokenPayloadData;
  secretKey: string;
  options: SignOptions;
};

type VerifyToken = {
  token: string;
  isRefresh: boolean;
};

export interface ITokenService {
  getUserByRefreshToken(refreshToken: string): Promise<IUser>;
  generateTokens(payload: TokenPayloadData): {
    accessToken: string;
    refreshToken: string;
  };

  verifyToken(data: { token: string; isRefresh: boolean }): TokenPayloadData;

  isValidToken(data: { token: string; isRefresh: boolean }): boolean;
}

class TokenService {
  constructor(private readonly tokenConfig: TokenConfig) {}

  async getUserByRefreshToken(refreshToken: string) {
    const tokenDoc = await Token.findOne({ refreshToken })
      .populate<{ dbId: IUser }>('dbId')
      .lean()
      .exec();

    if (!tokenDoc) throw new AuthError('Invalid refresh token', errorCode.REFRESH_INVALID);

    return tokenDoc.dbId;
  }

  generateToken({ secretKey, payload, options }: GenerateToken): string {
    return jwt.sign(payload, secretKey, options);
  }

  generateTokens(payload: TokenPayloadData) {
    return {
      accessToken: this.generateToken({
        payload,
        secretKey: this.tokenConfig.access.secret,
        options: this.tokenConfig.access.options,
      }),
      refreshToken: this.generateToken({
        payload,
        secretKey: this.tokenConfig.refresh.secret,
        options: this.tokenConfig.refresh.options,
      }),
    };
  }

  verifyToken({ token, isRefresh }: VerifyToken): TokenPayloadData {
    try {
      const secret = isRefresh ? this.tokenConfig.refresh.secret : this.tokenConfig.access.secret;
      const decoded = jwt.verify(token, secret) as TokenPayloadData;
      return decoded;
    } catch (err) {
      throw new AuthError(`Invalid or expired ${isRefresh ? 'refresh' : 'access'} token`);
    }
  }

  isValidToken(data: VerifyToken) {
    try {
      this.verifyToken(data);
      return true;
    } catch {
      return false;
    }
  }
}

export const tokenService = new TokenService(tokenConfig);
