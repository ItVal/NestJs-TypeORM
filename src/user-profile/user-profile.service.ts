import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfiles } from 'src/entities/userProfiles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

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

 async findOne(id: number) {
   // Vérifie que l'ID est un UUID valide
    if (!isUUID(id)) {
    throw new BadRequestException(`Invalid ID format. Expected UUID.`);
  }
     return  await this.usersProfileRepository.findOne({ where: { id } });

  }

async update(id: string, updateUserProfileDto: UpdateUserProfileDto) {
  // Vérifie que l'ID est un UUID valide
  if (!isUUID(id)) {
    throw new BadRequestException(`Invalid ID format. Expected UUID.`);
  }
 return  await this.usersProfileRepository.update(id, updateUserProfileDto);
 
}

  async remove(id: number) {
     // Vérifie que l'ID est un UUID valide
  if (!isUUID(id)) {
    throw new BadRequestException(`Invalid ID format. Expected UUID.`);
  }
    return await this.usersProfileRepository.delete({ id });
  }
}
