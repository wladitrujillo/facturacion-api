import { Router } from "express";
import ReportController from "../controller/report.ctrl";


export class ReportRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let controller = new ReportController();

        this.router.route("/:invoceId").get(controller.reportInvoice);

    }
}