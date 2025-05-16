import { IsString } from 'class-validator';
export class createUsersDto {
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsString()
    status: string;
}