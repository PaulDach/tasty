import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Restaurant} from "./restaurant";
import {Product} from "./product";

@Entity("menu")
export class Menu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: 0})
    price: number;

    @Column("int", {nullable: true})
    restaurantId: number;

    @ManyToOne(type => Restaurant, restaurant => restaurant.menus, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinColumn()
    restaurant: Restaurant;

    @ManyToMany(type => Product, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinTable()
    products: Product[];

}
