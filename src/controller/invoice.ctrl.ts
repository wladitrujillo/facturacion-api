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

            let branchId: string = req.params.branchId;
            let enterpriseId: string = res.locals.jwtPayload.enterprise;
            let invoice: IInvoice = <IInvoice>req.body;
            invoice.enterprise = enterpriseId;
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