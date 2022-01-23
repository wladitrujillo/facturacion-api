import { Request, Response } from "express";
import AuthService = require("../service/auth.service");
import { IUser } from "../model/user";
import { getLogger } from 'log4js';
import { ICompany } from "../model/company";

const logger = getLogger("AuthController");

class AuthController {

    static register = async (req: Request, res: Response) => {
        logger.debug("Iniciar Registro");
        try {
            let user: IUser = <IUser>req.body.user;
            let company: ICompany = <ICompany>req.body.company;
            let newUser = await new AuthService().register(company, user, req.body.user.password);
            res.send(newUser);
        }
        catch (error: any) {
            logger.error(error);
            logger.error("Code ====>>", error.code);
            logger.error("Message ====>>", error.message);
            res.status(500).send(error.message);
        }
    }

    static authenticate = async (req: Request, res: Response) => {
        logger.debug("Inicia Autenticación");
        try {
            var email: string = req.body.email;
            var password: string = req.body.password;
            let auth = await new AuthService().authenticate(email, password);
            res.send(auth);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }
    static authenticateWithCompany = async (req: Request, res: Response) => {
        logger.debug("Inicia authenticateWithCompany");
        try {
            let ruc: string = req.params.ruc;
            var email: string = req.body.email;
            var password: string = req.body.password;
            let auth = await new AuthService().authenticateWithCompany(ruc, email, password);
            res.send(auth);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        logger.debug("Iniciar forgotPassword");
        try {
            await new AuthService().forgotPassword(req.body.email);
            res.send();
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    static forgotPasswordWithCompany = async (req: Request, res: Response) => {
        logger.debug("Inicia forgotPasswordWithCompany");
        try {
            await new AuthService().forgotPasswordWithCompany(req.params.ruc, req.body.email);
            res.send();
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }
    static resetPassword = async (req: Request, res: Response) => {
        logger.debug("Iniciar resetPassword");
        try {
            await new AuthService().resetPassword(req.body.token, req.body.password);
            res.send();
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    static activateAccount = async (req: Request, res: Response) => {
        logger.debug("Inicia activateAccount");
        try {
            await new AuthService().activateAccount(req.params.userId);
            res.send();
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }
}
export = AuthController;
