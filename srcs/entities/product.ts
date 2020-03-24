import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Side} from "./side";
import {isMainThread} from "worker_threads";
import {Restaurant} from "./restaurant";


enum Cooking {
    rare,
    medium,
    wellDone,
    other
}

enum ProductType {
    drink,
    main,
    dessert,
    other
}

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: false})
    canChooseSide: boolean;

    @Column({default: false})
    canChooseCooking: boolean;

    @Column({type: "enum", enum: ProductType, default: ProductType.other})
    type: ProductType;

    @Column({default: 0})
    price: number;

    @ManyToMany(type => Side, {cascade: true})
    @JoinTable()
    sides: Side[];

    @Column("int", {nullable: true})
    restaurantId: number;

    @ManyToOne(type => Restaurant, restaurant => restaurant.products, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinColumn()
    restaurant: Restaurant;
}
