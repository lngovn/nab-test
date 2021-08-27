import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from './db.config.json';

export const dbConfig: PostgresConnectionOptions = {
  ...config,
  type: 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
};
