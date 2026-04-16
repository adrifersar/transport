import { Module } from '@nestjs/common';
import { CategoryDriverService } from './category-driver.service';
import { CategoryDriverController } from './category-driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryDriver } from './entities/category-driver.entity';

@Module({
  controllers: [CategoryDriverController],
  providers: [CategoryDriverService],
  imports: [TypeOrmModule.forFeature([CategoryDriver])],
})
export class CategoryDriverModule {}
