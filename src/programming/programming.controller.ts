import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProgrammingService } from './programming.service';
import { CreateProgrammingDto } from './dto/create-programming.dto';
import { UpdateProgrammingDto } from './dto/update-programming.dto';
import { ProgrammingFiltersDto } from './dto/filter-programming.dto';

@Controller('programming')
export class ProgrammingController {
  constructor(private readonly programmingService: ProgrammingService) { }

  @Post()
  create(@Body() createProgrammingDto: CreateProgrammingDto) {
    return this.programmingService.create(createProgrammingDto);
  }

  @Get('/search')
  findAll(@Query() programmingFiltersDto: ProgrammingFiltersDto) {
    return this.programmingService.findAll(programmingFiltersDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgrammingDto: UpdateProgrammingDto) {
    return this.programmingService.update(id, updateProgrammingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programmingService.remove(id);
  }
}
