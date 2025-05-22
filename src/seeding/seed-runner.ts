import { DataSource } from 'typeorm';
import { dbConfig } from 'dbConfig';
import { InitialSeed } from './initialSeed';

const dataSource = new DataSource(dbConfig);

dataSource
  .initialize()
  .then(async () => {
    console.log('🌱 Seeding started...');
    await new InitialSeed();
    console.log('✅ Seeding done');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  });
