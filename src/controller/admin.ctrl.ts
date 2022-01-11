
import AdminService = require("../service/admin.service");
import { Request, Response } from "express";
import { getLogger } from 'log4js';

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

            let roles = await this.adminService.retrieveRoles();
            res.status(200).send(roles);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    getCatalogByName = async (req: Request, res: Response) => {

        logger.debug("Start retriveCatalog");
        try {
            let response: any = await this.adminService.getCatalogByName(req.params.name);
            res.send(response);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    getCompany = async (req: Request, res: Response) => {
        logger.debug("Start getCompany");
        try {
            let companyId = res.locals.jwtPayload.company;
            let response: any = await this.adminService.getCompanyById(companyId);
            res.send(response);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    updateCompany = async (req: Request, res: Response) => {
        logger.debug("Start getCompany");
        try {
            let companyId = res.locals.jwtPayload.company;
            let response: any = await this.adminService.updateCompany(companyId, req.body);
            res.send(response);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }
}
export = AdminController;