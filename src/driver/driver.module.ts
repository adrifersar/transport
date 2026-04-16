import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  controllers: [DriverController],
  providers: [DriverService],
  imports: [
    TypeOrmModule.forFeature([Driver]), VehicleModule

  ],
  exports: [TypeOrmModule,
  ]
})
export class DriverModule { }
