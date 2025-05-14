import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUsersDto } from './dto/createUsers.dto';

@Controller('users')
export class UsersController {
    @Get()
        findAll(){
            return 'This action returns all users';
        }
    @Get(':id')
        findOne(@Param() id){
            return id;
        }
    
    @Post()
    // utilisation de la validation des données
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})) 
    @HttpCode(202)
        create(@Body() body: createUsersDto){
            return body;   
        }

    
    }


