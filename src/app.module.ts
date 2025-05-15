import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'dbConfig';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(dbConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
