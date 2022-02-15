import { IBranch } from "../model/branch";
import BranchService = require("../service/branch.service");
import BaseController = require("./base.ctrl");
import { Request, Response } from "express";
import { getLogger } from 'log4js';
import { PageRequest } from "../model/page-request";

const logger = getLogger("BranchController");

class BranchController extends BaseController<IBranch> {

    constructor() {
        super(new BranchService());

    }

    create = async (req: Request, res: Response) => {
        logger.debug("Start create override in BranchController");
        try {
            let objectCreated = await new BranchService().createWithEstablishment(req.params.establishmentId, req.body);
            res.send(objectCreated);
        }
        catch (error: any) {
            logger.error(error);
            let message = error.message;
            console.log('COde', error.code == 11000);
            if (error.code == '11000') message = "Registro ya existe";
            res.status(500).send(message);

        }
    }

    retrieve = async (req: Request, res: Response) => {
        logger.debug("Start retrive override in BranchController");
        try {
            let establishmentId = req.params.establishmentId;
            let pageRequest = new PageRequest(req);
            let response: any = await this._service.retrieve({ establishment: establishmentId }, pageRequest);
            res.header('X-Total-Count', response.total);
            res.send(response.data);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }
}
export = BranchController;