import RoleService = require("../service/role.service");
import { Request, Response } from "express";
import { getLogger } from 'log4js';

const logger = getLogger("RoleController");

class RoleController {

    private _service: RoleService;

    constructor() {
        this._service = new RoleService();
    }

    retrieve = async (req: Request, res: Response) => { 
        try {

            let roles = await this._service.retrieve();
            res.status(200).send(roles);
        }
        catch (e) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }


}
export = RoleController;    