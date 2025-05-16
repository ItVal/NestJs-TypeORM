import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfiles } from 'src/entities/userProfiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfiles])], // Add your entities here
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
