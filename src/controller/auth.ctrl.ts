import { Request, Response } from "express";

import AuthService = require("../service/auth.service");
import { IUser } from "../model/user";
import { getLogger } from 'log4js';
import { emit } from "cluster";

const logger = getLogger("AuthController");


class AuthController {

    static register = async (req: Request, res: Response) => {
        logger.debug("Start register");
        try {
            let user: IUser = <IUser>req.body;
            let newUser = await new AuthService().register(user, req.body.password);
            res.send(newUser);
        }
        catch (e) {
            logger.error(e);
            logger.error("Code ====>>", e.code);
            logger.error("Message ====>>", e.message);
            res.status(500).send(e.message);
        }
    }

   

    static authenticate = async (req: Request, res: Response) => {
        logger.debug("Start authenticate");
        try {
            var email: string = req.body.email;
            var password: string = req.body.password;
            var enterprise: string = req.body.enterprise;
            let auth = await new AuthService().authenticate(email, password);
            res.send(auth);
        }
        catch (e) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }



}
export = AuthController;    