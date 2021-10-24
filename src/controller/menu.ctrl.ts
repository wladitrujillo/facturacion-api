import MenuService = require("../service/menu.service");
import { Request, Response } from "express";
import { getLogger } from 'log4js';

const logger = getLogger("MenuController");

class MenuController {

    private _service: MenuService;

    constructor() {
        this._service = new MenuService();
    }

    retrieveMenu = async (req: Request, res: Response) => {
        try {
            let role = res.locals.jwtPayload.role;
            let menu = await this._service.retrieveMenu(role);
            res.status(200).send(menu);
        }
        catch (e) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }


}
export = MenuController;    