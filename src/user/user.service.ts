import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { PassThrough } from 'stream';
import { UpdateEmailVerificationInput } from './dto/update-email-verification.dto';
import { encryptPassword } from 'src/common/security/password.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const role = await this.roleRepository.findOne({
        where: {
          name: createUserDto.role,
        },
      });
      if (!role) throw new Error('role not found');
      const newUser = this.userRepository.create({
        ...createUserDto,
        role: role,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async updateEmailVerification(
    input: UpdateEmailVerificationInput,
  ): Promise<User> {
    const user = await this.findById(input.userId);
    if (!user) throw new Error(`Usuario con ID ${input.userId} no encontrado`);

    user.isEmailVerified = input.isEmailVerified;
    //user.emailVerificationExpires = input.emailVerificationExpires;
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await encryptPassword(updateUserDto.password);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<User | undefined> {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      await this.userRepository.remove(user);
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    //this.logger.error(`Error in the subject: ${error.detail}`);

    if (error.code === '23505') throw new ConflictException(error);
    if (error.code === '23503')
      throw new ConflictException('Foreign Key Restriction');

    throw new InternalServerErrorException();
  }
}
