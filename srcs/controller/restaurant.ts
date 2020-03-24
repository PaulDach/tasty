import {getRepository} from "typeorm";
import {Restaurant} from "../entities/restaurant";
import {Context} from "koa";

export class RestaurantController {

    static async post(ctx: Context) {
        const repository = getRepository(Restaurant);

        let restaurant = new Restaurant();

        restaurant.name = ctx.request.body.name;

        try {
            await repository.save(restaurant);
        } catch (e) {
            ctx.throw(500, `Error while saving entity --> ${e.toString()}`)
        }

        ctx.body = restaurant;
    }

    static async get(ctx: Context) {
        const repository = getRepository(Restaurant);

        let result: Restaurant[];

        try {
            result = await repository.find(ctx.params.id);
        } catch (e) {
            ctx.throw(500, `Error while querying entities --> ${e.toString()}`)
        }

        ctx.body = result;
    }

    static async getById(ctx: Context) {
        const repository = getRepository(Restaurant);

        let result: Restaurant;

        try {
            result = await repository.findOne(ctx.params.id);
        } catch (e) {
            ctx.throw(500, `Error while querying entity --> ${e.toString()}`)
        }

        ctx.body = result;
    }
}
