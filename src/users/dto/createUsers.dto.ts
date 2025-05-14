import { IsString, IsNumber, Length, IsPositive } from 'class-validator';
export class createUsersDto {
    @IsString()
    @Length(3, 20, { message: 'Name must be between 3 and 20 characters' })
    name: string;
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsNumber()
    age: number;
    @IsString()
    address: string;
    @IsString()
    @IsPositive()
    @Length(10, 15, { message: 'Phone number must be between 10 and 15 characters' })   
    phone: string;
}