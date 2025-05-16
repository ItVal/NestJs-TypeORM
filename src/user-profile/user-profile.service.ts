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
    const profile = await this.usersProfileRepository.findOne({ where: { id } });
     if (!profile) {
               throw new NotFoundException(`User with id ${id} not found`);
           }
           return profile;
  }


// async update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
//     const profile = await this.usersProfileRepository.update(id, updateUserProfileDto);
//     if (!profile) {
//       throw new NotFoundException(`User with id ${id} not found, maybe not exist?`);
//     } 
//     return profile;
//   }

async update(id: string, updateUserProfileDto: UpdateUserProfileDto) {
  // Vérifie que l'ID est un UUID valide
  if (!isUUID(id)) {
    throw new BadRequestException(`Invalid ID format. Expected UUID.`);
  }
    // .update()
 return  await this.usersProfileRepository.update(id, updateUserProfileDto);
 
}

  // remove(id: number) {
  //   return `This action removes a #${id} userProfile`;
  // }
}
