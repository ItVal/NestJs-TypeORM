import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfiles } from 'src/entities/userProfiles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileService {
     constructor(
            @InjectRepository(UserProfiles)
            private usersProfileRepository: Repository<UserProfiles>,
  ) {}
  
  async create(dto: CreateUserProfileDto) {
    return await this.usersProfileRepository.save(dto);
  }

  async findAll() {
    return  await this.usersProfileRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} userProfile`;
  }

  update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    return `This action updates a #${id} userProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProfile`;
  }
}
