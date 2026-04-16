import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProgrammingDto } from './dto/create-programming.dto';
import { UpdateProgrammingDto } from './dto/update-programming.dto';
import { ProgrammingFiltersDto } from './dto/filter-programming.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Programming } from './entities/programming.entity';
import { Repository } from 'typeorm';
import { handleExceptions } from 'src/common/exceptions/handle-exceptions';

@Injectable()
export class ProgrammingService {

  constructor(
    @InjectRepository(Programming)
    private readonly programmingRepository: Repository<Programming>,

  ) { }
  private readonly logger = new Logger(ProgrammingService.name);
  create(createProgrammingDto: CreateProgrammingDto) {
    try {
      const programmin = this.programmingRepository.create(createProgrammingDto);
      //this.logger.log(`[ADD] User:${user?.userName}, Ip:${user?.clientIp}, new subject: ${JSON.stringify(driver)}`);
      return this.programmingRepository.save(programmin);


    } catch (error) {
      this.logger.error(`Error in the programmin: ${error.detail}`);
      handleExceptions(error);

    }
  }

  async findAll(programmingFiltersDto: ProgrammingFiltersDto) {
    const queryBuilder = this.programmingRepository.createQueryBuilder('programmin');
    const { description, maxMileage, minMileage, time, typeProgramming, isActive, limit, page } = programmingFiltersDto;


    if (isActive !== undefined) {
      queryBuilder.andWhere('programmin.isActive = :isActive', { isActive });
    }

    if (typeProgramming) {
      queryBuilder.andWhere('programmin.typeProgramming = :typeProgramming', {
        typeProgramming
      });
    }

    if (minMileage !== undefined) {
      queryBuilder.andWhere('programmin.currentMileage >= :minMileage', { minMileage });
    }
    if (maxMileage !== undefined) {
      queryBuilder.andWhere('programmin.currentMileage <= :maxMileage', { maxMileage });
    }

    if (description) {
      queryBuilder.andWhere('programmin.description ILIKE :description', {
        description: `%${description}%`
      });
    }

    if (time) {
      queryBuilder.andWhere('vehicle.time ILIKE :time', {
        time: `%${time}%`
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
      return await this.programmingRepository.findOneByOrFail({ id })

    } catch (error) {
      this.logger.error(`Error in the programming: ${error.message}`);
      handleExceptions(error);
    }
  }

  async update(id: string, updateProgrammingDto: UpdateProgrammingDto) {
    const programming = await this.programmingRepository.preload({
      id: id,
      ...updateProgrammingDto
    });

    if (!programming) {

      this.logger.warn(`programming not found`);
      throw new NotFoundException(`programming witch id: ${id} not found`);
    }

    try {

      return this.programmingRepository.save(programming);
      //this.logger.log(`[EDIT] User:${user?.userName}, Ip:${user?.clientIp}, history list updated: ${JSON.stringify(historyList)}`)  


    } catch (error) {
      this.logger.error(`Error in the programming: ${error.message}`);
      handleExceptions(error);

    }
  }

  async remove(id: string) {
    try {
      const programming = await this.findOne(id);
      if (!programming) {
        throw new NotFoundException(`programming with ID ${id} not found`);
      }
      await this.programmingRepository.remove(programming);
      //this.logger.log(`[DELETE] User:${user?.userName}, Ip:${user?.clientIp}, history list deleted: ${JSON.stringify(historyList)}`)



      return `programming list deleted`

    } catch (error) {
      this.logger.error(`Error in the programming: ${error.message}`);
      handleExceptions(error);

    };
  }
}
