import { BadRequestException, Injectable, Next, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { createUsersDto } from './dto/createUsers.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { validate as isUUID } from 'uuid';
import { UserPaginationDto } from './dto/userPagination.dto';
import { DefaultLimitPagination } from 'src/utils/defaultLimitPagination';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll(userPaginationDto: UserPaginationDto) {
        return await this.usersRepository.find({
            skip: userPaginationDto.skip,
            take: userPaginationDto.limit ?? DefaultLimitPagination,
        });
    }


    async findOne(id: number) {
       const user =  await this.usersRepository.findOne({ where: { id } });
       if (!user) {
           throw new NotFoundException(`User with id ${id} not found`);
       }
     return user;

    }


    async create(dto:createUsersDto) {
        return await this.usersRepository.save(dto);
    }


    async update(id: number, updateUserDto: UpdateUserDto) {
        if (!isUUID(id)) {
          throw new BadRequestException(`Invalid ID format. Expected UUID.`);
        }
       return await this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: number) {
        if (!isUUID(id)) {
          throw new BadRequestException(`Invalid ID format. Expected UUID.`);
        }

    return await this.usersRepository.delete({ id })
    }

}
