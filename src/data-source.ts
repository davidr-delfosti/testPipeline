import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ENV } from './common/config';
import { join } from 'path';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: ENV.DB_HOST,
  port: +ENV.DB_PORT,
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, 'modules', '**', '*.entity.{ts,js}')],
  migrations: [],
  subscribers: [],
};

export const dataSource = new DataSource(dataSourceOptions);
