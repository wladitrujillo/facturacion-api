import { Router } from "express";
import AuthController = require("../controller/auth.ctrl");


export class AuthRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        this.router.route("/register")
            .post(AuthController.register);

        this.router.route("/login")
            .put(AuthController.authenticate);

        this.router.route("/forgot-password")
            .post(AuthController.forgotPassword);

        this.router.route("/company/:ruc/login")
            .put(AuthController.authenticateWithCompany);

        this.router.route("/company/:ruc/forgot-password")
            .put(AuthController.forgotPasswordWithCompany);

        this.router.route("/reset-password")
            .put(AuthController.resetPassword);

        this.router.route("/activate-account/:userId")
            .put(AuthController.activateAccount);
    }
}
