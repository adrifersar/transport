import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { TypedConfigService } from 'src/config/typed-config.service';
import { ConfigService } from '@nestjs/config';
import { Role } from './entities/role.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, {
    provide: TypedConfigService,
    useExisting: ConfigService,
  },],
  imports: [
    TypeOrmModule.forFeature([Role, User])
  ],
  exports: [TypeOrmModule, UserService]
})
export class UserModule { }
