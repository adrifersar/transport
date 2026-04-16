import { Exclude } from 'class-transformer';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({ type: 'text', unique: true })
    email: string;

    @ApiProperty()
    @Column({ type: 'text' })
    @Exclude()
    password: string;


    @ApiProperty()
    @Column({ type: 'bool', default: false })
    isEmailVerified: boolean;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })
    emailVerificationExpires: Date;

    @ApiProperty()
    @Column({ type: 'text', unique: true })
    fullName: string;

    @ApiProperty()
    @Column({ type: 'bool', default: true })
    isActive: boolean;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ApiProperty()
    @ManyToOne(() => Role, (role) => role.users, { cascade: true, eager: true })
    role: Role;

    // @OneToMany(() => Product, (product) => product.user)
    // product: Product;

    @BeforeInsert()
    checkFieldBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate() {
        this.checkFieldBeforeInsert();
    }
}
