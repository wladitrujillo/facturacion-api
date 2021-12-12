import { Router } from "express";
import { UserController } from "../controller/user.ctrl"

export class UserRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();

    }
    routes() {

        let controller = new UserController();
        this.router.route("/profile-info")
            .get(controller.profileInfo);

        this.router.route("/")
            .get(controller.retrieve)
            .post(controller.create);

        this.router.route("/:_id")
            .get(controller.findById)
            .put(controller.update)
            .delete(controller.delete);

    }
}