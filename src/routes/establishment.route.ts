import { Router } from "express";
import EstablishmentController = require("../controller/establishment.ctrl");
import BranchController = require("../controller/branch.ctrl");


export class EstablishmentRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {


        let branchCtrl = new BranchController();


        this.router.route("/:establishmentId/branch")
            .get(branchCtrl.retrieve)
            .post(branchCtrl.create);

        this.router.route("/:establishmentId/branch/:_id")
            .get(branchCtrl.findById)
            .put(branchCtrl.update)
            .delete(branchCtrl.delete);

        let establishmentCtrl = new EstablishmentController();

        this.router.route("/")
            .get(establishmentCtrl.retrieve)
            .post(establishmentCtrl.create);

        this.router.route("/:_id")
            .get(establishmentCtrl.findById)
            .put(establishmentCtrl.update)
            .delete(establishmentCtrl.delete);



    }
}