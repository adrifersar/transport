// dto/filter-category-driver.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

import { PaginationDTO } from 'src/common/dto/pagination.dto';

export class FilterCategoryDriverDto extends PartialType(PaginationDTO){
  @ApiProperty({
    description: 'Descripción de la categoría (búsqueda parcial)',
    example: 'A',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  
}