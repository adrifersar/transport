import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    Length
} from 'class-validator';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { TypeProgramming } from '../entities/programming.entity';




export class ProgrammingFiltersDto extends PartialType(PaginationDTO) {

    @ApiProperty({
        description: 'Estado activo del vehículo',
        required: false
    })
    @IsOptional()
    @IsBoolean({ message: 'isActive debe ser un valor booleano (true/false)' })
    @Type(() => Boolean)
    isActive?: boolean;

    @ApiProperty({
        description: 'Tipo de programación del vehículo',
        enum: TypeProgramming,
        required: false
    })
    @IsOptional()
    @IsEnum(TypeProgramming, {
        message: 'typeProgramming debe ser: transfer, visita, circuito, excursión, libre'
    })
    typeProgramming?: TypeProgramming;

    // @ApiProperty({        
    //     description: 'Kilometraje exacto del recorrido',
    //     minimum: 0,
    //     maximum: 9999999.99,
    //     required: false
    // })
    // @IsOptional()
    // @IsNumber({}, { message: 'currentMileage debe ser un número' })
    // @Min(0, { message: 'El kilometraje no puede ser negativo' })
    // @Max(9999999.99, { message: 'El kilometraje no puede exceder 9,999,999.99' })
    // @Type(() => Number)
    // currentMileage?: number;

    @ApiProperty({
        description: 'Descripción del recorrido',
        maxLength: 250,
        required: false
    })
    @IsOptional()
    @IsString({ message: 'La descripción debe ser texto' })
    @MaxLength(250, {
        message: 'La descripción no puede exceder 250 caracteres'
    })
    @Length(1, 250, {
        message: 'La descripción debe tener entre 1 y 250 caracteres'
    })
    description?: string;

    @ApiProperty({
        description: 'Tiempo del recorrido',
        maxLength: 50,
        required: false
    })
    @IsOptional()
    @IsString({ message: 'El tiempo debe ser texto' })
    @MaxLength(50, {
        message: 'El tiempo no puede exceder 50 caracteres'
    })
    @Length(1, 50, {
        message: 'El tiempo debe tener entre 1 y 50 caracteres'
    })
    time?: string;

    @ApiProperty({
        description: 'Kilometraje máximo',
        required: false,
        minimum: 0,
        maximum: 9999999.99
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(9999999.99)
    @Type(() => Number)
    maxMileage?: number;

    @ApiProperty({
        description: 'Kilometraje mínimo',
        required: false,
        minimum: 0,
        maximum: 9999999.99
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(9999999.99)
    @Type(() => Number)
    minMileage?: number;

}