import { Module } from '@nestjs/common';
import { ProgrammingService } from './programming.service';
import { ProgrammingController } from './programming.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programming } from './entities/programming.entity';

@Module({
  controllers: [ProgrammingController],
  providers: [ProgrammingService],
  imports: [
    TypeOrmModule.forFeature([Programming])

  ],
  exports: [TypeOrmModule,
  ]
})
export class ProgrammingModule { }
