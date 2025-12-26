import { envConfig } from './env.config.js';
import { SignOptions } from 'jsonwebtoken';

type OptionsJWT = {
  secret: string;
  options: SignOptions;
};

export interface TokenConfig {
  access: OptionsJWT;
  refresh: OptionsJWT;
}

export const tokenConfig: TokenConfig = {
  access: {
    secret: envConfig.JWT_SECRET_ACCESS,
    options: {
      expiresIn: '1h',
    },
  },
  refresh: {
    secret: envConfig.JWT_SECRET_REFRESH,
    options: {
      expiresIn: '7d',
    },
  },
};
