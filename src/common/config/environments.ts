import 'dotenv/config';

export const ENV = {
  PORT: process.env.PORT || 3020,
  LOGGING: process.env.LOGGING || true,
  NODE_ENV: process.env.NODE_ENV || 'local',
  DB_PORT: process.env.DB_PORT || 5430,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || 'root',
  DB_NAME: process.env.DB_NAME || 'test',
};
