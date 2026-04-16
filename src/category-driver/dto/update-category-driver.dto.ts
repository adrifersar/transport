import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDriverDto } from './create-category-driver.dto';

export class UpdateCategoryDriverDto extends PartialType(CreateCategoryDriverDto) {}
