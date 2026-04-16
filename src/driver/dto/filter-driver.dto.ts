import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { PaginationDTO } from "src/common/dto/pagination.dto";
import { StatusDriver } from "../enum/status.enum";

export class FilterDriverDto extends PartialType(PaginationDTO) {

    @ApiProperty({

        description: 'Nombre del chofer',
        required: false
    })
    @IsString()
    @IsOptional()
    fullName?: string;

    @ApiProperty({

        description: 'Dirección del chofer',
        required: false
    })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({
        description: 'Identificación',
        required: false
    })
    @IsString()
    @Length(11, 11, { message: 'ID card must be 11 characters long.' })
    @IsOptional()
    idCard?: string;

    @ApiProperty({
        default: true,
        required: false

    })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isActive?: boolean;

    @ApiProperty({
        
        description: 'status del chofer',
        enum: StatusDriver,
        required: false
    })
    @IsOptional()
    @IsEnum(StatusDriver, {
        message: 'typeProgramming debe ser: transfer, visita, circuito, excursión, libre'
    })
    status?: StatusDriver;

    @ApiProperty({ description: 'Fecha del status(inicio)', format: 'YYMMDDHHMM', required: false })
    @IsString()
    @IsOptional()
    dateIn?: string;


    @ApiProperty({ description: 'Fecha del status(fin)', format: 'YYMMDDHHMM', required: false })
    @IsString()
    @IsOptional()
    dateEnd?: string;


}
