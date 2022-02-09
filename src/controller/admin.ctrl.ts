
import AdminService = require("../service/admin.service");
import { EmailService } from "../service/mail.service";
import { Request, Response } from "express";
import { getLogger } from 'log4js';
import { Email } from "../model/email";

const logger = getLogger("AdminController");

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
        try {
            let companyId = res.locals.jwtPayload.company;
            let email: Email = {
                to: req.body.email,
                subject: 'Prueba de Email',
                template: 'emailtest',
                context: { year: new Date().getFullYear() }
            }
            this.emailService.sendMail(email)
            res.sendStatus(200);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    getCountries = async (req: Request, res: Response) => {
        try {
            let response: any = await this.adminService.getCountries();
            res.send(response);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    getStates = async (req: Request, res: Response) => {
        try {
            let response: any = [];

            let country: string = req.params.country;
            if (country != 'null') {
                response = await this.adminService.getStates(country);
            }
            res.send(response);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    getCities = async (req: Request, res: Response) => {
        try {
            let response: any = [];
            if (req.params.state != 'null')
                response = await this.adminService.getCities(req.params.state)

            res.send(response);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }
}
export = AdminController;