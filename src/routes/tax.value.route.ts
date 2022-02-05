import { Router } from "express";
import TaxValueController from "../controller/tax.value.ctrl";


export class TaxValueRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let taxValueController = new TaxValueController();

        this.router.route("/")
            .get(taxValueController.retrieve)
            .post(taxValueController.create);

        this.router.route("/:_id")
            .get(taxValueController.findById)
            .put(taxValueController.update)
            .delete(taxValueController.delete);

    }
}