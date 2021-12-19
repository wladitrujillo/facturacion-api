
import { Router } from "express";
import AdminController = require("../controller/admin.ctrl");


export class AdminRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let adminController = new AdminController();

        this.router.route("/menu")
            .get(adminController.getMenu);

        this.router.route("/role")
            .get(adminController.getRoles);

        this.router.route("/catalog/:name")
            .get(adminController.getCatalogByName);
    }
}