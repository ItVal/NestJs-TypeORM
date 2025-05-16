import { IsString, Length } from "class-validator";

export class CreateUserProfileDto {
    id: number;
            @IsString()
            fullPame: string;
            @IsString()
            @Length(10, 15)
            phone: string;
            @IsString()
            country: string;
            @IsString()
            avatarProfile: string;
            @IsString()
            @Length(10, 100)
            bio: string;
}
