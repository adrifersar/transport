import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryDriver {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 2, nullable: false })
    description: string;
}
