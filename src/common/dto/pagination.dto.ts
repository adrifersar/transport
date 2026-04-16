import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min, MinLength } from "class-validator";

export class PaginationDTO {

    @ApiProperty({
        default: 10,
        description: 'How many rows do you need',
        required: false
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    @Min(1)
    limit?: number;

    @ApiProperty({
        default: 1,
        description: 'How many rows do you want skip',
        required: false
    })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    page?: number;
}