import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_1ITvHarRfck7@ep-sparkling-breeze-a5f4yaj4-pooler.us-east-2.aws.neon.tech/cours_nestjs?sslmode=require',
  synchronize: true,
  entities: ['dist/**/*.entity.js'], // à adapter selon ta config
};
