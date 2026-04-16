import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDriverDto } from './dto/create-category-driver.dto';
import { UpdateCategoryDriverDto } from './dto/update-category-driver.dto';
import { FilterCategoryDriverDto } from './dto/filter-category-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDriver } from './entities/category-driver.entity';
import { Repository } from 'typeorm';
import { handleExceptions } from 'src/common/exceptions/handle-exceptions';

@Injectable()
export class CategoryDriverService {
  constructor(
    @InjectRepository(CategoryDriver)
    private readonly categoryDriverepository: Repository<CategoryDriver>,

  ) { }

  private readonly logger = new Logger(CategoryDriverService.name);
  create(createCategoryDriverDto: CreateCategoryDriverDto) {
    try {
      const categoryDriver = this.categoryDriverepository.create(createCategoryDriverDto);
      //this.logger.log(`[ADD] User:${user?.userName}, Ip:${user?.clientIp}, new subject: ${JSON.stringify(driver)}`);
      return this.categoryDriverepository.save(categoryDriver);


    } catch (error) {
      this.logger.error(`Error in the categoryDriver: ${error.detail}`);
      handleExceptions(error);


    }

  }

  async findAll(filterCategoryDriverDto: FilterCategoryDriverDto) {
    const queryBuilder = this.categoryDriverepository.createQueryBuilder('categoryDriver');
    const { description, limit, page } = filterCategoryDriverDto;


    if (description) {
      queryBuilder.andWhere('LOWER(categoryDriver.description) LIKE LOWER(:description)', {
        description: `%${description}%`,
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
      return await this.categoryDriverepository.findOneByOrFail({ id })

    } catch (error) {
      this.logger.error(`Error in the categoryDriver: ${error.message}`);
      handleExceptions(error);
    }
  }

  async update(id: string, updateCategoryDriverDto: UpdateCategoryDriverDto) {
    const categoryDriver = await this.categoryDriverepository.preload({
      id: id,
      ...updateCategoryDriverDto
    });

    if (!categoryDriver) {

      this.logger.warn(`categoryDriver not found`);
      throw new NotFoundException(`categoryDriver witch id: ${id} not found`);
    }

    try {

      return this.categoryDriverepository.save(categoryDriver);
      //this.logger.log(`[EDIT] User:${user?.userName}, Ip:${user?.clientIp}, history list updated: ${JSON.stringify(historyList)}`)  


    } catch (error) {
      this.logger.error(`Error in the categoryDriver: ${error.message}`);
      handleExceptions(error);

    }
  }

  async remove(id: string) {
    try {
      const categoryDriver = await this.findOne(id);
      if (!categoryDriver) {
        throw new NotFoundException(`categoryDriver with ID ${id} not found`);
      }
      await this.categoryDriverepository.remove(categoryDriver);
      //this.logger.log(`[DELETE] User:${user?.userName}, Ip:${user?.clientIp}, history list deleted: ${JSON.stringify(historyList)}`)



      return `categoryDriver list deleted`

    } catch (error) {
      this.logger.error(`Error in the categoryDriver: ${error.message}`);
      handleExceptions(error);

    };
  }
}
