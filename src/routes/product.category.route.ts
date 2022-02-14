import { Router } from "express";
import ProductCategoryController = require("../controller/product.category.ctrl");


export class ProductCategoryRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let categoryController = new ProductCategoryController();

        this.router.route("/")
            .get(categoryController.retrieve)
            .post(categoryController.create);

        this.router.route("/:_id")
            .get(categoryController.findById)
            .put(categoryController.update)
            .delete(categoryController.delete);

        this.router.route("/:category/product")
            .get(categoryController.retrieveAllProducts);



    }
}