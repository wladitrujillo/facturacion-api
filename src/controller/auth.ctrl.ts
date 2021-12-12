import { Request, Response } from "express";

import AuthService = require("../service/auth.service");
import { IUser } from "../model/user";
import { getLogger } from 'log4js';
import { emit } from "cluster";

const logger = getLogger("AuthController");


class AuthController {

    static register = async (req: Request, res: Response) => {
        logger.debug("Iniciar Registro");
        try {
            let user: IUser = <IUser>req.body;
            let newUser = await new AuthService().register(user, req.body.password);
            res.send(newUser);
        }
        catch (error) {
            logger.error(error);
            logger.error("Code ====>>", error.code);
            logger.error("Message ====>>", error.message);
            res.status(500).send(error.message);
        }
    }



    static authenticate = async (req: Request, res: Response) => {
        logger.debug("Iniciar Autentificación");
        try {
            var email: string = req.body.email;
            var password: string = req.body.password;
            let auth = await new AuthService().authenticate(email, password);
            res.send(auth);
        }
        catch (error) {
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
        catch (error) {
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
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

}
export = AuthController;