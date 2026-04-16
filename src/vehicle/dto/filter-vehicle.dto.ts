import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { PaginationDTO } from "src/common/dto/pagination.dto";
import { StatusVehicle } from "../enum/status.enum";

export class FilterVehicleDto extends PartialType(PaginationDTO) {

    @ApiProperty({ required: false })
    @IsString()
    @Length(7, 7)
    @IsOptional()
    numCar?: string;

    @ApiProperty({ required: false })
    @IsInt()
    @Min(1)
    @Max(40)
    @Type(() => Number)
    @IsOptional()
    seatCount?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 1 })
    @Min(0)
    @Type(() => Number)
    @IsOptional()
    currentMileage?: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    brand?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isActive?: boolean = true;

    @ApiProperty({
        description: 'status del chofer',
        enum: StatusVehicle,
        required: false
    })
    @IsOptional()
    @IsEnum(StatusVehicle, {
        message: 'typeProgramming debe ser: transfer, visita, circuito, excursión, libre'
    })
    status?: StatusVehicle;

    @ApiProperty({ description: 'Fecha del status(inicio)', format: 'YYMMDDHHMM', required: false })
    @IsString()
    @IsOptional()
    dateIn?: string;


    @ApiProperty({ description: 'Fecha del status(fin)', format: 'YYMMDDHHMM', required: false })
    @IsString()
    @IsOptional()
    dateEnd?: string;
}
