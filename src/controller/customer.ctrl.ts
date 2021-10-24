import { ICustomer } from "../model/customer";
import CustomerService = require("../service/customer.service");
import BaseController = require("./base.ctrl");
import { IEnterprise } from "../model/enterprise";
import { Request, Response } from "express";
import { IUser } from "../model/user";
import { getLogger } from 'log4js';

const logger = getLogger("CustomerController");

class CustomerController extends BaseController<ICustomer> {

    constructor() {
        super(new CustomerService());

    }

    findByTaxId = async (req: Request, res: Response) => {

        try {
            let enterprise = res.locals.jwtPayload.enterprise;
            let taxId = req.params.taxId;
            let customer: ICustomer = await this._service.findOne({ enterprise: enterprise, taxId: taxId });     
            res.send(customer);
        }
        catch (e) {
            logger.error(e);
            res.status(e.code).send(e.message);
        }

    }
}
export = CustomerController;    