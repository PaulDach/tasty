import {Context} from "koa";
import {getRepository} from "typeorm";
import {Product} from "../entities/product";

export class ProductController {

    static async post(ctx: Context) {
        const repository = getRepository(Product);

        let product = new Product();

        product.name = ctx.request.body.name;
        product.restaurantId = ctx.request.body.restaurantId;
        product.canChooseCooking = ctx.request.body.canChooseCooking;
        product.canChooseSide = ctx.request.body.canChooseSide;
        product.price = ctx.request.body.price;
        product.type = ctx.request.body.type;

        try {
            await repository.save(product);
        } catch (e) {
            ctx.throw(500, `Error while saving entity --> ${e.toString()}`)
        }

        ctx.body = product;
    }

    static async get(ctx: Context) {
        const repository = getRepository(Product);

        let result: Product[];

        try {
            result = await repository.find(ctx.params.id);
        } catch (e) {
            ctx.throw(500, `Error while querying entities --> ${e.toString()}`)
        }

        ctx.body = result;
    }

    static async getById(ctx: Context) {
        const repository = getRepository(Product);

        let result: Product;

        try {
            result = await repository.findOne(ctx.params.id);
        } catch (e) {
            ctx.throw(500, `Error while querying entity --> ${e.toString()}`)
        }

        ctx.body = result;
    }

    static async patch(ctx: Context) {
        const repository = getRepository(Product);

        let result: Product;

        try {
            result = await repository.findOne(ctx.params.id);
        } catch (e) {
            ctx.throw(500, `Error while querying entity --> ${e.toString()}`)
        }

        if (result == undefined)
            ctx.throw(404, "Ressource doesn't exist");

        //TODO: Use preload reflection in production

        result.name = ctx.request.body.name;
        result.canChooseCooking = ctx.request.body.canChooseCooking;
        result.canChooseSide = ctx.request.body.canChooseSide;
        result.price = ctx.request.body.price;
        result.type = ctx.request.body.type;

        try {
            await repository.save(result);
        } catch (e) {
            ctx.throw(500, `Error while patching entity --> ${e.toString()}`)
        }

        ctx.body = result;
    }

    static async delete(ctx: Context) {
        const repository = getRepository(Product);

        try {
            await repository.delete(ctx.params.id)
        } catch (e) {
            ctx.throw(500, `Error while deleting entity --> ${e.toString()}`)
        }

        ctx.status = 202;
        ctx.body = {success: true}
    }
}
