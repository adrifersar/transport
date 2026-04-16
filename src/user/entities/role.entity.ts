import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles')
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
