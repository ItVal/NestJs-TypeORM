import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dbConfig: PostgresConnectionOptions = {
  url: 'postgresql://neondb_owner:npg_1ITvHarRfck7@ep-sparkling-breeze-a5f4yaj4-pooler.us-east-2.aws.neon.tech/cours_nestjs?sslmode=require',
  type: 'postgres',
  port: 3306,
  entities: [__dirname+'/**/*.entity{.ts,.js}'],
  synchronize: true, // FALSE in production
};
