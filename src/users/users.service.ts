import { Injectable, Next, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { createUsersDto } from './dto/createUsers.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

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


    async create(dto:createUsersDto): Promise<User> {
        return await this.usersRepository.save(dto);
    }
    // async update(id: number, user: User): Promise<User> {
    //     await this.usersRepository.update(id, user);
    //     const updatedUser = await this.usersRepository.findOneBy({ id });
    //     if (!updatedUser) {
    //         throw new Error(`User with id ${id} not found`);
    //     }
    //     return updatedUser;
    // }
    // async remove(id: number): Promise<void> {
    //     const user = await this.usersRepository.findOneBy({ id });
    //     if (!user) {
    //         throw new Error(`User with id ${id} not found`);
    //     }
    //     await this.usersRepository.delete(id);
    // }

}
