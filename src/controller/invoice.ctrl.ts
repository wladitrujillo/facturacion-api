import { Request, Response } from "express";
import { IInvoice } from "../model/invoice";
import InvoiceService = require("../service/invoice.service");
import BaseController = require("./base.ctrl");
import { getLogger } from 'log4js';

const logger = getLogger("InvoiceController");

class InvoiceController extends BaseController<IInvoice>{
    constructor() {
        super(new InvoiceService());

    }
    createInvoice = async (req: Request, res: Response) => {
        try {

            req.body.company = res.locals.jwtPayload.company;
            let branchId: string = req.params.branchId;
            let invoice: IInvoice = <IInvoice>req.body;
            logger.debug("Create invoice ==>>", invoice);
            let newInvoice: IInvoice = await new InvoiceService().createInvoice(branchId, invoice);

            res.status(200).send(newInvoice);
        }
        catch (e) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }

}
export = InvoiceController;    