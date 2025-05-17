import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}
  //create role
  async create(createRoleDto: CreateRoleDto) {
    return await this.rolesRepository.save(createRoleDto);
  }
  //findAll
 async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
     if (!isUUID(id)) {
    throw new BadRequestException(`Invalid ID format. Expected UUID.`);
  }
    return await this.rolesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
      if (!isUUID(id)) {
    throw new BadRequestException(`Invalid ID format. Expected UUID.`);
  }
    return await this.rolesRepository.update(id, updateRoleDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
