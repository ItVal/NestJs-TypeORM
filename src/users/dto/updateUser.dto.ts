
import { PartialType } from '@nestjs/mapped-types';
import { createUsersDto } from './createUsers.dto';


export class UpdateUserDto extends PartialType(createUsersDto) {}