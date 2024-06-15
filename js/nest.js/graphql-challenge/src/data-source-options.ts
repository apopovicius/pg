import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export function isTest() {
  return process.env.NODE_ENV === 'test';
}

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: isTest() ? 'test-db.sqlite' : 'db.sqlite',
  synchronize: true,
  entities: [`${__dirname}/**/*.model.{ts,js}`],
  seeds: [`src/database/seeds/**/*{.ts,.js}`],
  factories: [`src/database/factories/**/*{.ts,.js}`],
  logging: true,
};
