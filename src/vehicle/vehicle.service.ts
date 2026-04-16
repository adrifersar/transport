import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { handleExceptions } from 'src/common/exceptions/handle-exceptions';
import { FilterVehicleDto } from './dto/filter-vehicle.dto';

@Injectable()
export class VehicleService {

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

  ) { }
  private readonly logger = new Logger(VehicleService.name);
  create(createVehicleDto: CreateVehicleDto) {
    try {
      const vehicle = this.vehicleRepository.create(createVehicleDto);
      //this.logger.log(`[ADD] User:${user?.userName}, Ip:${user?.clientIp}, new subject: ${JSON.stringify(driver)}`);
      return this.vehicleRepository.save(vehicle);


    } catch (error) {
      this.logger.error(`Error in the vehicle: ${error.detail}`);
      handleExceptions(error);


    }
  }

  async findAll(filterVehicleDto: FilterVehicleDto) {
    const queryBuilder = this.vehicleRepository.createQueryBuilder('vehicle');
    const { brand, currentMileage, numCar, seatCount, isActive, dateEnd, dateIn, status, limit, page } = filterVehicleDto;


    if (brand) {
      queryBuilder.andWhere('LOWER(vehicle.brand) LIKE LOWER(:brand)', {
        brand: `%${brand}%`,
      });
    }

    if (currentMileage) {
      queryBuilder.andWhere('vehicle.currentMileage <= :currentMileage)', {
        currentMileage: currentMileage,
      });
    }

    if (numCar) {
      queryBuilder.andWhere('LOWER(vehicle.numCar) LIKE LOWER(:numCar)', {
        numCar: `%${numCar}%`,
      });
    }

    if (seatCount) {
      queryBuilder.andWhere('vehicle.seatCount <= :seatCount', {
        seatCount: seatCount,
      });
    }

    if (isActive) {
      queryBuilder.andWhere('vehicle.isActive = :isActive', {
        isActive: isActive
      });
    }

    if (status) {
      queryBuilder.andWhere('driver.status = :status', {
        status
      });
    }

    if (dateIn) {
      queryBuilder.andWhere('history.dateIn >= :dateIn', {
        dateIn
      });
    }
    if (dateEnd) {
      queryBuilder.andWhere('history.dateEnd <= :dateEnd', {
        dateEnd
      });
    }



    const currentPage = page || 1;
    const currentLimit = limit || 10;
    const skip = (currentPage - 1) * currentLimit;
    queryBuilder.skip(skip).take(currentLimit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages: Math.ceil(total / currentLimit)
    };
  }

  async findOne(id: string) {
    try {
      return await this.vehicleRepository.findOneByOrFail({ id })

    } catch (error) {
      this.logger.error(`Error in the vehicle: ${error.message}`);
      handleExceptions(error);
    }
    // const vehicle = await this.vehicleRepository.findOneBy({ id });
    // if (!vehicle) {

    //   this.logger.warn(`Vehicle not found`);
    //   throw new NotFoundException(`Vehicle witch id: ${id} not found`);
    // }
    // try {
    //   return vehicle;
    // } catch (error) {
    //   this.logger.error(`Error in the vehicle: ${error.detail}`);
    //   handleExceptions(error);
    // }
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.preload({
      id: id,
      ...updateVehicleDto
    });

    if (!vehicle) {

      this.logger.warn(`Vehicle not found`);
      throw new NotFoundException(`Driver witch id: ${id} not found`);
    }

    try {

      return this.vehicleRepository.save(vehicle);
      //this.logger.log(`[EDIT] User:${user?.userName}, Ip:${user?.clientIp}, history list updated: ${JSON.stringify(historyList)}`)  


    } catch (error) {
      this.logger.error(`Error in the vehicle: ${error.message}`);
      handleExceptions(error);

    }
  }

  async remove(id: string) {
    try {
      const vehicle = await this.findOne(id);
      if (!vehicle) {
        throw new NotFoundException(`vehicle with ID ${id} not found`);
      }
      await this.vehicleRepository.remove(vehicle);
      //this.logger.log(`[DELETE] User:${user?.userName}, Ip:${user?.clientIp}, history list deleted: ${JSON.stringify(historyList)}`)



      return `vehicle list deleted`

    } catch (error) {
      this.logger.error(`Error in the vehicle: ${error.message}`);
      handleExceptions(error);

    };
  }

}
