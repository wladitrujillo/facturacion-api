import { Router } from "express";
import MenuController = require("../controller/menu.ctrl");


export class MenuRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let controller = new MenuController();
        this.router.route("/")
            .get(controller.retrieveMenu);


    }
}