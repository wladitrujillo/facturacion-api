import { Router } from "express";
import ProductController = require("../controller/product.ctrl");


export class ProductRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let controller = new ProductController();
        this.router.route("/")
            .get(controller.retrieve)
            .post(controller.create);

        this.router.route("/:_id")
            .get(controller.findById)
            .put(controller.update)
            .delete(controller.delete);

    }
}