import { Router } from "express";
import TableController = require("../controller/table.ctrl");

export class TableRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let tableCtrl = new TableController();

        this.router.route("/:tableId/catalog")
            .get(tableCtrl.retrieveCatalog);

        this.router.route("/")
            .get(tableCtrl.retrieve);
    }
}