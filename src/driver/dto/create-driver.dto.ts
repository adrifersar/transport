import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { StatusDriver } from "../enum/status.enum";

export class CreateDriverDto {

    @ApiProperty({
        example: 'Alonso Fernandez',
        description: 'Nombre del chofer',
    })
    @IsString()
    @IsOptional()
    fullName?: string;

    @ApiProperty({
        example: 'calle O e/ 23 y 21',
        description: 'Dirección del chofer',
    })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({
        description: 'Identificación',
    })
    @IsString()
    @IsOptional()
    @Length(11, 11, { message: 'ID card must be 11 characters long.' })
    idCard?: string;

    @ApiProperty({
        description: 'Chofer activo',
        default: true

    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({
        example: StatusDriver.DISPONIBLE,
        description: 'status del chofer',
        enum: StatusDriver,
        default: StatusDriver.DISPONIBLE,
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

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    assignedCar?: string;

}
