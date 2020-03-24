import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Side {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    markup: number;
}
