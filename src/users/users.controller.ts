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
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get('one/:id')
  findOne(@Param('id') id) {
    return this.usersService.findOne(id);
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
  create( @Body() dto: createUsersDto,) {
    return this.usersService.create(dto);
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
