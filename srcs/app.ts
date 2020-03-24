import "reflect-metadata";
import * as Koa from 'koa';
import * as bodyParser from "koa-bodyparser";
import {router} from "./router";
import {createConnection} from "typeorm";

const app = new Koa();

app.use(bodyParser())
    .use(router.routes());

app.listen(3000);
console.log("Listening on http://localhost:3000");


async function dbConnction() {
    try {
        const connection = await createConnection();
        await connection.synchronize();
    } catch (e) {
        console.error(e);
        process.exit(-21);
    }
}

dbConnction();
