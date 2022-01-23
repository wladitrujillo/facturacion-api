
import AdminService = require("../service/admin.service");
import { EmailService } from "../service/mail.service";
import { Request, Response } from "express";
import { getLogger } from 'log4js';

const logger = getLogger("MenuController");

class AdminController {

    private adminService: AdminService;
    private emailService: EmailService;

    constructor() {
        this.adminService = new AdminService();
        this.emailService = new EmailService();
    }

    getMenu = async (req: Request, res: Response) => {
        try {
            let role = res.locals.jwtPayload.role;
            let menu = await this.adminService.retrieveMenu(role);
            res.status(200).send(menu);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }


    getRoles = async (req: Request, res: Response) => {
        try {

            let roles = await this.adminService.retrieveRoles();
            res.status(200).send(roles);
        }
        catch (error: any) {
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
        catch (error: any) {
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
        catch (error: any) {
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
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    testEmail = async (req: Request, res: Response) => {
        logger.debug("Start testEmail:", req.body.email);
        try {
            let companyId = res.locals.jwtPayload.company;
            this.emailService.sendMail(req.body.email, "Email de prueba", "Este es un email de prueba para tu Facturero Agil")
            res.sendStatus(200);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }
}
export = AdminController;