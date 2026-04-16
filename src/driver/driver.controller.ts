import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Driver } from './entities/driver.entity';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { FilterDriverDto } from './dto/filter-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product was created',
    type: Driver,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Token related' })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Búsqueda personalizada' })
  findAll(@Query() filterDriverDto: FilterDriverDto) {
    return this.driverService.findAll(filterDriverDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }
}
