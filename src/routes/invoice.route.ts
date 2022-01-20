import { Router } from "express";
import InvoiceController = require("../controller/invoice.ctrl");


export class InvoiceRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let controller = new InvoiceController();

        this.router.route("/").get(controller.retrieve);
        this.router.route("/branch/:branchId")
            .post(controller.createInvoice);
        this.router.route("/indicator/:indicator").get(controller.indicators);

    }
}