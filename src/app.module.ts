import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'dbConfig';
import { UserProfileModule } from './user-profile/user-profile.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(dbConfig), UserProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
