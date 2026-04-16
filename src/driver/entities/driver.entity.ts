import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusDriver } from "../enum/status.enum";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";



@Entity()
export class Driver {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column
        ('text')
    fullName: string;


    @Column
        ('text')
    address: string;


    @Column
        ('text', {
            unique: true
        })
    idCard: string;

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


    @Column
        ('bool', {
            default: true
        })
    isActive: boolean;

    @Column({
        type: "enum",
        enum: StatusDriver,
        default: StatusDriver.DISPONIBLE
    })

    status: StatusDriver;

    @OneToOne(() => Vehicle, (vehicle) => vehicle.assignedDriver, {
        nullable: true,
        eager: true,
        cascade: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'assigned_car_id' })
    assignedCar: Vehicle | null;


    //falta categoría




}
