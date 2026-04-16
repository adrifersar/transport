import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/database.config';
import { authConfig } from './config/auth.config';
import { appConfigSchema } from './config/config.types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/app.config';
import { DriverModule } from './driver/driver.module';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ProgrammingModule } from './programming/programming.module';
import { CategoryDriverModule } from './category-driver/category-driver.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig, typeOrmConfig, authConfig],
    validationSchema: appConfigSchema,
    cache: true,
    validationOptions: {
      abortEarly: true,
    },
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      ...configService.get('database'),
      autoLoadEntities: true
    }),
  }),
  DriverModule,
  UserModule,
  VehicleModule,
  ProgrammingModule,
  CategoryDriverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
