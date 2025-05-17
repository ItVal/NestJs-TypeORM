import { IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateRoleDto {
    @IsString()
    designation: string;
}
