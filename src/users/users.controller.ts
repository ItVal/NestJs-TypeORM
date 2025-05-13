import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

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
    @HttpCode(202)
        create(@Body() body){
            return body;   
        }

    
    }


