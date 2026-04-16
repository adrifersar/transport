import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryDriverService } from './category-driver.service';
import { CreateCategoryDriverDto } from './dto/create-category-driver.dto';
import { UpdateCategoryDriverDto } from './dto/update-category-driver.dto';
import { FilterCategoryDriverDto } from './dto/filter-category-driver.dto';

@Controller('category-driver')
export class CategoryDriverController {
  constructor(private readonly categoryDriverService: CategoryDriverService) { }

  @Post()
  create(@Body() createCategoryDriverDto: CreateCategoryDriverDto) {
    return this.categoryDriverService.create(createCategoryDriverDto);
  }

  @Get('/search')
  findAll(@Query() filterCategoryDriverDto: FilterCategoryDriverDto) {
    return this.categoryDriverService.findAll(filterCategoryDriverDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryDriverService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDriverDto: UpdateCategoryDriverDto) {
    return this.categoryDriverService.update(id, updateCategoryDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryDriverService.remove(id);
  }
}
