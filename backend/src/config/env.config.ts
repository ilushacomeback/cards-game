import dotenv from 'dotenv';
dotenv.config();

type Environments = 'TG_APP_TOKEN' | 'JWT_SECRET_ACCESS' | 'JWT_SECRET_REFRESH' | 'MONGODB_URI';

function requireEnv(name: Environments): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

export const envConfig = {
  TOKEN_TG_APP: requireEnv('TG_APP_TOKEN'),
  JWT_SECRET_ACCESS: requireEnv('JWT_SECRET_ACCESS'),
  JWT_SECRET_REFRESH: requireEnv('JWT_SECRET_REFRESH'),
  MONGODB_URI: requireEnv('MONGODB_URI'),
} as const;
