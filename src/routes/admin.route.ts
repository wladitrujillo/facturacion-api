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

        this.router.route("/country")
            .get(adminController.getCountries);

        this.router.route("/country/:country/state")
            .get(adminController.getStates);

        this.router.route("/country/:country/state/:state/city")
            .get(adminController.getCities);

        this.router.route("/company")
            .get(adminController.getCompany)
            .put(adminController.updateCompany);

        this.router.route("/testEmail")
            .put(adminController.testEmail);
    }
}