import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsString,
    IsStrongPassword,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'usuario@ejemplo.com',
        description: 'Correo electrónico del usuario',
    })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({
        example: 'contraseña123',
        description: 'Contraseña del usuario (mínimo 6 caracteres)',
    })
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    password: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    fullName: string;

    @ApiProperty()
    @IsString()
    role: string;

    @IsBoolean()
    isEmailVerified?: boolean;

    @IsDate()
    emailVerificationExpires?: Date;
}
