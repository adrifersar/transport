import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { StatusVehicle } from "../enum/status.enum";

export class CreateVehicleDto {
    @ApiProperty({ example: 'ABC1234' })
    @IsString()
    @Length(7, 7)
    numCar: string;

    @ApiProperty({ example: 4 })
    @IsInt()
    @Min(1)
    @Max(40)
    @Type(() => Number)
    seatCount: number;

    @ApiProperty({ example: 15000.5, required: false })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 1 })
    @Min(0)
    @Type(() => Number)
    currentMileage?: number;

    @ApiProperty({ example: 'Toyota' })
    @IsString()
    brand: string;

    @ApiProperty({ default: true, required: false })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isActive?: boolean = true;


    @ApiProperty({ description: 'Fecha del status(inicio)', format: 'YYMMDDHHMM', required: false })
    @IsString()
    @IsOptional()
    dateIn?: string;


    @ApiProperty({ description: 'Fecha del status(fin)', format: 'YYMMDDHHMM', required: false })
    @IsString()
    @IsOptional()
    dateEnd?: string;


    @ApiProperty({
        example: StatusVehicle.DISPONIBLE,
        description: 'status del carro',
        enum: StatusVehicle,
        default: StatusVehicle.DISPONIBLE,
        required: false
    })
    @IsOptional()
    @IsEnum(StatusVehicle, {
        message: 'typeProgramming debe ser: transfer, visita, circuito, excursión, libre'
    })
    status?: StatusVehicle;

}
