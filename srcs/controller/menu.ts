import {Context} from "koa";
import {getRepository} from "typeorm";
import {Menu} from "../entities/menu";

export class MenuController {

    static async post(ctx: Context) {
        const repository = getRepository(Menu);

        let menu = new Menu();

        menu.name = ctx.request.body.name;
        menu.restaurantId = ctx.request.body.restaurantId;
        menu.price = ctx.request.body.price;

        try {
            await repository.save(menu);
        } catch (e) {
            ctx.throw(500, `Error while saving entity --> ${e.toString()}`)
        }

        ctx.body = menu;
    }

    static async get(ctx: Context) {
        const repository = getRepository(Menu);

        let result: Menu[];

        try {
            result = await repository.find({where: {id: ctx.params.id}});
        } catch (e) {
            ctx.throw(500, `Error while querying entities --> ${e.toString()}`)
        }

        ctx.body = result;
    }

    static async getById(ctx: Context) {
        const repository = getRepository(Menu);

        let result: Menu;

        try {
            result = await repository.findOne({where: {id: ctx.params.id}, relations: ["products"]});
        } catch (e) {
            ctx.throw(500, `Error while querying entity --> ${e.toString()}`)
        }

        ctx.body = result;
    }

}
