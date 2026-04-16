import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TypeProgramming {
    TRANSFER = "transfer",
    VISITA = "visita",
    CIRCUITO = "circuito",
    EXCURSIÓN = "excursión",
    LIBRE = "libre",
}

@Entity()
export class Programming {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column
        ('bool', {
            default: true,
            nullable: false
        })
    isActive: boolean;

    @Column({
        type: "enum",
        enum: TypeProgramming,
        default: TypeProgramming.LIBRE,
    })
    typeProgramming: TypeProgramming;


    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0
    })
    currentMileage: number;

    @Column('varchar', { length: 120 })
    description: string;


    @Column('varchar', { length: 50 })
    time: string;





}
