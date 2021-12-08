
import AdminService = require("../service/admin.service");
import { Request, Response } from "express";
import { getLogger } from 'log4js';
import { PageRequest } from "../model/page-request";

const logger = getLogger("MenuController");

class AdminController {

    private adminService: AdminService;

    constructor() {
        this.adminService = new AdminService();
    }

    getMenu = async (req: Request, res: Response) => {
        try {
            let role = res.locals.jwtPayload.role;
            let menu = await this.adminService.retrieveMenu(role);
            res.status(200).send(menu);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }


    getRoles = async (req: Request, res: Response) => {
        try {

            let roles = await this.adminService.retrieveRoles('SUPERADMIN');
            res.status(200).send(roles);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    getCatalogByTableId = async (req: Request, res: Response) => {
        logger.debug("Start retriveCatalog");
        try {
            let tableName = req.params.tableId;
            let table = await this.adminService.getTableByName(tableName);
            let response: any = await this.adminService.getCatalogByTableId(table._id);
            res.send(response);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }


    getTables = async (req: Request, res: Response) => {
        logger.debug("Start retrive");
        try {

            let pageRequest = new PageRequest(req);
            let response: any = await this.adminService.getTables({}, pageRequest);
            res.header('X-Total-Count', response.total);
            res.send(response.data);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }


}
export = AdminController;