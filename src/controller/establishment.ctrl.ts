import { IEstablishment } from "../model/establishment";
import EstablishmentService = require("../service/establishment.service");
import BaseController = require("./base.ctrl");

class EstablishmentController extends BaseController<IEstablishment> {
    constructor() {
        super(new EstablishmentService());

    }
}
export = EstablishmentController;    