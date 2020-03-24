import * as Router from "koa-router";
import {RestaurantController} from "./controller/restaurant";
import {Product} from "./entities/product";
import {Menu} from "./entities/menu";
import {MenuController} from "./controller/menu";
import {SideController} from "./controller/side";
import {ProductController} from "./controller/product";

export const router = new Router(
    {prefix: "/api"}
);


router
    .post('/restaurants', RestaurantController.post)
    .get('/restaurants', RestaurantController.get)
    .get('/restaurants/:id', RestaurantController.getById)

    .post('/products', ProductController.post)
    .get('/products', ProductController.get)
    .get('/products/:id', ProductController.getById)
    .delete('/product/:id', ProductController.delete)
    .patch('/product/:id', ProductController.patch)

    .post('/sides', SideController.post)
    .get('/sides', SideController.get)
    .get('/sides/:id', SideController.getById)

    .post('/menus', MenuController.post)
    .get('/menus', MenuController.get)
    .get('/menus/:id', MenuController.getById)


;

