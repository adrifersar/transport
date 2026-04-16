import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class UpdateEmailVerificationInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El userId es requerido' })
  userId: string;

  @ApiProperty()
  @IsBoolean()
  isEmailVerified: boolean;

  @ApiProperty()
  @IsDate()
  emailVerificationExpires?: Date;
}
