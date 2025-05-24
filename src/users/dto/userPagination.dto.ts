import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


export  class UserPaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    skip?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    limit?: number;
}