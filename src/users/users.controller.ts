import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createUsersDto } from './dto/createUsers.dto';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'This action returns all users';
  }
  @Get(':id')
  findOne(@Param() id) {
    return id;
  }

  @Post()
  // utilisation de la validation des données
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      groups: ['create'],
    }),
  )
  // definition du code de retour
  @HttpCode(202)
  create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        groups: ['create'],
      }),
    )
    body: createUsersDto,
  ) {
    return body;
  }
  @Patch(':id')
  update(
    @Param() id,
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        groups: ['update'],
        always: true,
      }),
    )
    body: createUsersDto,
  ) {
    return body;
  }
}
