import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDriverDto {
    @ApiProperty({
        description: 'Descripción de la categoría (2 caracteres)',
        example: 'A1',
        maxLength: 2,
        minLength: 2
    })
    @IsString()
    @IsNotEmpty({ message: 'La descripción es requerida' })
    @Length(2, 2, { message: 'La descripción debe tener exactamente 2 caracteres' })
    description: string;
}
