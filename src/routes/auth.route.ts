import { Router } from "express";
import AuthController = require("../controller/auth.ctrl");


export class AuthRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        this.router.route("/login")
            .post(AuthController.authenticate);


        this.router.route("/register")
            .post(AuthController.register);

    }
}