import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Max,
    MaxLength,
    Min
} from 'class-validator';
import { TypeProgramming } from '../entities/programming.entity';



export class CreateProgrammingDto {
    @ApiProperty({
        example: true,
        description: 'Estado activo del vehículo',
        default: true,
        required: false
    })
    @IsOptional()
    @IsBoolean({ message: 'isActive debe ser un valor booleano (true/false)' })
    @Type(() => Boolean)
    isActive?: boolean = true;

    @ApiProperty({
        example: TypeProgramming.LIBRE,
        description: 'Tipo de programación del vehículo',
        enum: TypeProgramming,
        default: TypeProgramming.LIBRE,
        required: false
    })
    @IsOptional()
    @IsEnum(TypeProgramming, {
        message: 'typeProgramming debe ser: transfer, visita, circuito, excursión, libre'
    })
    typeProgramming?: TypeProgramming;

    @ApiProperty({
        example: 15000.50,
        description: 'Kilometraje actual del vehículo',
        minimum: 0,
        maximum: 9999999.99,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { message: 'currentMileage debe ser un número' })
    @Min(0, { message: 'El kilometraje no puede ser negativo' })
    @Max(9999999.99, { message: 'El kilometraje no puede exceder 9,999,999.99' })
    @Type(() => Number)
    currentMileage?: number;

    @ApiProperty({
        example: 'Vehículo familiar en buen estado',
        description: 'Descripción del recorrido',
        maxLength: 120,
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
        example: '08:00',
        description: 'Hora asociada al vehículo (formato HH:mm)',
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
}
