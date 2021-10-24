import { ITable } from "../model/table";
import { Request, Response } from "express";
import TableService = require("../service/table.service");
import CatalogService = require("../service/catalog.service");
import BaseController = require("./base.ctrl");
import { getLogger } from 'log4js';
import { PageRequest } from "../model/page-request";

const logger = getLogger("TableController");

class TableController extends BaseController<ITable> {
    constructor() {
        super(new TableService());
    }

    retrieveCatalog = async (req: Request, res: Response) => {
        logger.debug("Start retriveCatalog");
        try {
            let tableName = req.params.tableId;
            let table = await this._service.findOne({name:tableName});
            let response: any = await new CatalogService().getByTableId(table._id);
            res.send(response);
        }
        catch (e) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }


    retrieve = async (req: Request, res: Response) => {
        logger.debug("Start retrive");
        try {

            let pageRequest = new PageRequest(req);
            let response: any = await this._service.retrieve({ }, pageRequest);
            res.header('X-Total-Count', response.total);
            res.send(response.data);
        }
        catch (e) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }



}
export = TableController;    