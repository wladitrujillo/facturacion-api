import { Router } from "express";
import CustomerController = require("../controller/customer.ctrl");


export class CustomerRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let controller = new CustomerController();




        this.router.route("/taxId/:taxId")
            .get(controller.findByTaxId)


        this.router.route("/")
            .get(controller.retrieve)
            .post(controller.create);

        this.router.route("/:_id")
            .get(controller.findById)
            .put(controller.update)
            .delete(controller.delete);

    }
}