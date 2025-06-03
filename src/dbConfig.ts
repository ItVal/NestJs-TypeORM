import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// Import ConfigService from @nestjs/config if you are using NestJS
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const dbConfig: PostgresConnectionOptions = {
    type: 'postgres',
    url: configService.get<string>('DATABASE_URL'),
    port: configService.get<number>('PORT'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // FALSE in production
}; 
