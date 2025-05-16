import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Add your entities here
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
