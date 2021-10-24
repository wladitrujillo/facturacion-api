import { Router } from "express";
import RoleController = require("../controller/role.ctrl");


export class RoleRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let controller = new RoleController();
        this.router.route("/")
            .get(controller.retrieve);


    }
}