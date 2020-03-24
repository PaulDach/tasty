import {Context} from "koa";
import {getRepository} from "typeorm";
import {Side} from "../entities/side";

export class SideController {

    static async post(ctx: Context) {
        const repository = getRepository(Side);

        let side = new Side();

        side.name = ctx.request.body.name;
        side.markup = ctx.request.body.markup;

        try {
            await repository.save(side);
        } catch (e) {
            ctx.throw(500, `Error while saving entity --> ${e.toString()}`)
        }

        ctx.body = side;
    }

    static async get(ctx: Context) {
        const repository = getRepository(Side);

        let result: Side[];

        try {
            result = await repository.find(ctx.params.id);
        } catch (e) {
            ctx.throw(500, `Error while querying entities --> ${e.toString()}`)
        }

        ctx.body = result;
    }

    static async getById(ctx: Context) {
        const repository = getRepository(Side);

        let result: Side;

        try {
            result = await repository.findOne(ctx.params.id);
        } catch (e) {
            ctx.throw(500, `Error while querying entity --> ${e.toString()}`)
        }

        ctx.body = result;
    }

}
