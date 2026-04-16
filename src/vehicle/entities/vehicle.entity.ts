import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusVehicle } from "../enum/status.enum";
import { Driver } from "src/driver/entities/driver.entity";

@Entity()
export class Vehicle {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column
        ('varchar', {
            unique: true,
            nullable: false,
            length: 7,
        })
    numCar: string;


    @Column('int', {
        nullable: false
    })
    seatCount: number;


    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0
    })
    currentMileage: number;


    @Column('varchar', { length: 50 })
    brand: string;


    @Column
        ('bool', {
            default: true,
            nullable: false
        })
    isActive: boolean;


    @Column({
        type: "enum",
        enum: StatusVehicle,
        default: StatusVehicle.DISPONIBLE
    })

    status: StatusVehicle;

    @Column
        ('text', {
            unique: true,
            nullable: true
        })
    dateIn: string;

    @Column
        ('text', {
            unique: true,
            nullable: true
        })
    dateEnd: string;

    @OneToOne(() => Driver, (driver) => driver.assignedCar, {
        nullable: true,
    })
    assignedDriver: Driver;
}
