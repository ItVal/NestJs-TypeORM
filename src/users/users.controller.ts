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
  @Get('one/:id')
  findOne(@Param() id) {
    return id;
  }

  @Post('create')
  // utilisation de la validation des données avec le pipe ValidationPipe
//   @UsePipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       groups: ['create'],
//       always: true,
//     }),
//   )


  // definition du code de retour 
  @HttpCode(202)
  create(
    @Body()
    body: createUsersDto,
  ) {
    return body;
  }
  @Patch('edit/:id')
  update(
    @Param() id,
    @Body()
      body: createUsersDto,
  ) {
    return body;
  }
}
