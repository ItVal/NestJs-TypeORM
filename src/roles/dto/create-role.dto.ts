import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    designation: string;
}
