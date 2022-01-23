import { Request, Response } from "express";
import { getLogger } from "log4js";
import InvoiceService = require("../service/invoice.service");

const logger = getLogger("InvoiceController");

class ReportController {

    private invoiceService: InvoiceService;

    constructor() {
        this.invoiceService = new InvoiceService();
    }


    reportInvoice = async (req: Request, res: Response) => {
        try {
            logger.debug("start reportInvoice id:", req.params.invoceId)
            this.invoiceService.invoiceReport(req.params.invoceId, res);
        }
        catch (e) {
            logger.error(e)
            res.sendStatus(500);

        }
    }

}

export = ReportController;


