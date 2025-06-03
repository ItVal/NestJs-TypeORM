import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined,
    entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: true, // FALSE in production
    ssl: { rejectUnauthorized: false },
};

export default dbConfig;    
