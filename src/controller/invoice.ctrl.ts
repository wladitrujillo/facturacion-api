import { Request, Response } from "express";
import { getLogger } from 'log4js';

import { IInvoice } from "../model/invoice";
import BaseController = require("./base.ctrl");

import InvoiceService = require("../service/invoice.service");
import IndicatorService = require("../service/indicator.service");
import { PageRequest } from "../model/page-request";


const logger = getLogger("InvoiceController");
class InvoiceController {

    private indicatorService: IndicatorService;
    private invoiceService: InvoiceService;

    constructor() {
        this.indicatorService = new IndicatorService();
        this.invoiceService = new InvoiceService();
    }

    retrieve = async (req: Request, res: Response) => {
        try {

            let company = res.locals.jwtPayload.company;
            let pageRequest = new PageRequest(req);
            let response: any = await this.invoiceService.retrieve({ company }, pageRequest);
            res.header('X-Total-Count', response.total);
            res.send(response.data);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }
    findById = async (req: Request, res: Response) => {
        try {

            let company = res.locals.jwtPayload.company;
            let invoice: IInvoice = await this.invoiceService.findById(req.params._id);
            res.send(invoice);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
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
        catch (e: any) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }

    indicators = async (req: Request, res: Response) => {
        try {

            let company: string = res.locals.jwtPayload.company;

            let indicator: string = req.params.indicator;

            let year: number = Number(req.query.year);
            let month: number = Number(req.query.month);
            let day: number = Number(req.query.day);


            let result;

            switch (indicator) {
                case 'monthly':
                    result = await this.indicatorService.monthly(company, year);
                    break;
                case 'daily':
                    result = await this.indicatorService.daily(company, year, month, day);
                    break;
                case 'topProduct':
                    result = await this.indicatorService.topProducts(company);
                    break;


            }

            res.status(200).send(result);
        }
        catch (e: any) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }

    queryInvoices = async (req: Request, res: Response) => {
        try {

            let company: string = res.locals.jwtPayload.company;
            let pageRequest = new PageRequest(req);
            let response = await this.invoiceService.queryInvoice(company, req.body, pageRequest);
            res.header('X-Total-Count', response.total);
            res.status(200).send(response.data);
        }
        catch (e: any) {
            logger.error(e);
            res.status(500).send(e.message);

        }
    }
}
export = InvoiceController;    