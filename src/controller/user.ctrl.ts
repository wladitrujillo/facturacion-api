import UserService = require("../service/user.service");
import BaseController = require("./base.ctrl");
import { IUser } from "../model/user";
import { Request, Response } from "express";

import { getLogger } from 'log4js';
import multer = require('multer');
import path from "path";
import fs from 'fs';


const logger = getLogger("UserController");

export class UserController extends BaseController<IUser>{

    constructor() {
        super(new UserService());
    }

    profileInfo = async (req: Request, res: Response) => {
        try {
            let objectFound = await new UserService().getUserById(res.locals.jwtPayload.sub);
            res.send(objectFound);
        }
        catch (error) {
            logger.error(error);
            res.send(error?.message);

        }
    }

}