import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import { handleExceptions } from 'src/common/exceptions/handle-exceptions';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { FilterDriverDto } from './dto/filter-driver.dto';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { StatusVehicle } from 'src/vehicle/enum/status.enum';

@Injectable()
export class DriverService {

  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    private readonly vehicleService: VehicleService

  ) { }
  private readonly logger = new Logger(Driver.name);
  async create(createDriverDto: CreateDriverDto) {
    try {
      const driver = this.driverRepository.create({ ...createDriverDto, assignedCar: null });
      if (createDriverDto.assignedCar) {
        const vehicle = await this.vehicleService.findOne(createDriverDto.assignedCar);
        if (!vehicle) {
          throw new NotFoundException('Vehículo no encontrado');
        }
        if (vehicle.status !== StatusVehicle.DISPONIBLE)

          throw new BadRequestException(
            `Vehicle ${vehicle.numCar} is already assigned to another driver`,
          );

        driver.assignedCar = vehicle;

      }

      //this.logger.log(`[ADD] User:${user?.userName}, Ip:${user?.clientIp}, new subject: ${JSON.stringify(driver)}`);
      return this.driverRepository.save(driver);


    } catch (error) {
      this.logger.error(`Error in the driver: ${error.message}`);
      handleExceptions(error);

    }
  }

  async findAll(filterDriverDto: FilterDriverDto) {
    const queryBuilder = this.driverRepository.createQueryBuilder('driver');
    queryBuilder.leftJoinAndSelect('driver.assignedCar', 'vehicle');
    const { address, fullName, idCard, isActive, status, dateEnd, dateIn, limit, page } = filterDriverDto;


    if (address) {
      queryBuilder.andWhere('LOWER(driver.address) LIKE LOWER(:address)', {
        address: `%${address}%`,
      });
    }

    if (fullName) {
      queryBuilder.andWhere('LOWER(driver.fullName) LIKE LOWER(:fullName)', {
        fullName: `%${fullName}%`,
      });
    }

    if (idCard) {
      queryBuilder.andWhere('LOWER(driver.idCard) LIKE LOWER(:idCard)', {
        idCard: `%${idCard}%`,
      });
    }

    if (isActive) {
      queryBuilder.andWhere('driver.isActive = :isActive', {
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
      return await this.driverRepository.findOne({
        where: { id },
        relations: {
          assignedCar: true
        }
      });
    } catch (error) {
      this.logger.error(`Error in the driver: ${error.detail}`);
      handleExceptions(error);
    }
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {

    try {
      const existingDriver = await this.findOne(id);
      if (!existingDriver) {

        this.logger.warn(`Driver not found`);
        throw new NotFoundException(`Driver witch id: ${id} not found`);
      }

      const { assignedCar, ...updateData } = updateDriverDto;

      Object.assign(existingDriver, updateData);
      if (assignedCar !== undefined) {
        if (assignedCar === null) {
          existingDriver.assignedCar = null;
        } else if (assignedCar) {
          const vehicle = await this.vehicleService.findOne(assignedCar);

          if (!vehicle) {
            throw new NotFoundException(`Vehicle with id ${assignedCar} not found`);
          }
          if (vehicle.status === StatusVehicle.DISPONIBLE) existingDriver.assignedCar = vehicle;



          throw new BadRequestException(
            `Vehicle ${assignedCar} is already assigned to another driver`,
          );



        }
      }
      return this.driverRepository.save(existingDriver);
      //this.logger.log(`[EDIT] User:${user?.userName}, Ip:${user?.clientIp}, history list updated: ${JSON.stringify(historyList)}`)  
    } catch (error) {
      this.logger.error(`Error in the driver: ${error.detail}`);
      handleExceptions(error);

    }
  }

  async remove(id: string) {

    try {
      const driver = await this.findOne(id);
      if (!driver) {
        throw new NotFoundException(`Driver with ID ${id} not found`);
      }
      await this.driverRepository.remove(driver);
      //this.logger.log(`[DELETE] User:${user?.userName}, Ip:${user?.clientIp}, history list deleted: ${JSON.stringify(historyList)}`)



      return `history list deleted`

    } catch (error) {
      this.logger.error(`Error in the driver: ${error.detail}`);
      handleExceptions(error);

    };
  }


}
