import { ICustomer } from "../model/customer";
import CustomerService = require("../service/customer.service");
import BaseController = require("./base.ctrl");
import { Request, Response } from "express";
import { getLogger } from 'log4js';

const logger = getLogger("CustomerController");

class CustomerController extends BaseController<ICustomer> {

    constructor() {
        super(new CustomerService());

    }

    findByTaxId = async (req: Request, res: Response) => {

        try {
            let taxId = req.params.taxId;
            let customer: ICustomer = await this._service.findOne({ taxId: taxId });
            res.send(customer);
        }
        catch (e: any) {
            logger.error(e);
            res.status(e.code).send(e.message);
        }

    }
}
export = CustomerController;