import { IsString, Length, IsPositive, IsInt } from 'class-validator';
export class createUsersDto {
    @IsString()
    @Length(4, 20, { message: 'Name must be between 4 and 20 characters for creation', groups: ['create'] })
    @Length(3, 20, { message: 'Name must be between 3 and 20 characters for update', groups: ['update'] })      
    name: string;
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsInt()
    @IsPositive()
    age: number;
    @IsString()
    address: string;
    @IsString()
    @Length(10, 15, { message: 'Phone number must be between 10 and 15 characters' })   
    phone: string;
}