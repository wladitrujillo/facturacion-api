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

            let objectParam: IBranch = <IBranch>req.body;

            
            objectParam.establishment = req.params.establishmentId;

            let objectCreated = await this._service.create(objectParam);
            res.send(objectCreated);
        }
        catch (e) {
            logger.error(e);
            res.status(500).send(e.message);

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
        catch (e) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }
}
export = BranchController;    