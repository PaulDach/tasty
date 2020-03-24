import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product";
import {Menu} from "./menu";

@Entity("restaurant")
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Product, product => product.restaurant)
    products: Product[];

    @OneToMany(type => Menu, menu => menu.restaurant)
    menus: Menu[];
}
