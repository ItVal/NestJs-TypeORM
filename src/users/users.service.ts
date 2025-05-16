import { BadRequestException, Injectable, Next, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { createUsersDto } from './dto/createUsers.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    
//findAll
    async findAll(){
        return await this.usersRepository.find();
    }


//findOne
    async findOne(id: number) {
       const user =  await this.usersRepository.findOne({ where: { id } });
       if (!user) {
           throw new NotFoundException(`User with id ${id} not found`);
       }
     return user;

    }

//create user
    async create(dto:createUsersDto) {
        return await this.usersRepository.save(dto);
    }

// update user
    async update(id: number, updateUserDto: UpdateUserDto) {
        // Vérifie que l'ID est un UUID valide
        if (!isUUID(id)) {
          throw new BadRequestException(`Invalid ID format. Expected UUID.`);
        }
       return await this.usersRepository.update(id, updateUserDto);
    }

//remove user
    async remove(id: number) {
    const user =  await this.usersRepository.findOne({ where: { id } });
       if (!user) {
           throw new NotFoundException(`User with id ${id} not exist`);
       }
    
    return await this.usersRepository.delete({ id })
    }

}
