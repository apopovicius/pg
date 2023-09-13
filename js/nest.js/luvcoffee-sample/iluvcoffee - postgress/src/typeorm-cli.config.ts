import { DataSource } from 'typeorm';
import { CoffeeRefactor1694423755868 } from './migrations/1694423755868-CoffeeRefactor';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [],
  migrations: [CoffeeRefactor1694423755868],
});
