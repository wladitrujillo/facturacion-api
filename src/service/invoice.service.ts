import InvoiceRepository from "./../repository/invoice.repository";
import BranchRepository from "./../repository/branch.repository";
import EstablishmentRepository from "./../repository/establishment.repository";
import { IInvoice } from "../model/invoice";
import { IBranch } from "../model/branch";
import { IEstablishment } from "../model/establishment";
import { Types } from "mongoose";
import ReportService from "./report.service";
import { CreateOptions } from "html-pdf";
import InvoiceDetailRepository from "../repository/inovice.detail.repository";
import { PageRequest } from "../model/page-request";
import { getLogger } from "log4js";
import path from "path";


const logger = getLogger("IndicatorService");

class InvoiceService {


    private branchRepository: BranchRepository;
    private establishmentRepository: EstablishmentRepository;
    private invoiceRespository: InvoiceRepository;
    private invoiceDetailRespository: InvoiceDetailRepository;
    private reportService: ReportService;
    constructor() {
        this.branchRepository = new BranchRepository();
        this.establishmentRepository = new EstablishmentRepository();
        this.invoiceRespository = new InvoiceRepository();
        this.invoiceDetailRespository = new InvoiceDetailRepository();
        this.reportService = new ReportService();
    }

    retrieve(criteria: any, pageRequest: PageRequest): Promise<IInvoice[]> {
        return this.invoiceRespository.retrieve(criteria, pageRequest);
    }

    findById(_id: string): Promise<IInvoice> {
        return this.invoiceRespository.findById(this.toObjectId(_id));
    }

    createInvoice = async (branchId: string, invoice: IInvoice): Promise<IInvoice> => {

        let branch: IBranch = await this.branchRepository.findById(this.toObjectId(branchId));
        let establishment: IEstablishment = await this.establishmentRepository.findById(branch.establishment);
        branch.next = branch.next + 1;
        await this.branchRepository.update(branch._id, branch);
        invoice.branch = branchId;
        invoice.secuence = establishment.code + "-" + branch.code + "-" + "0".repeat(5) + branch.next;
        let createdInvoice = await this.invoiceRespository.create(invoice);

        let createdDetail;

        for (let detail of invoice.detail) {
            detail.company = createdInvoice.company;
            detail.invoice = createdInvoice._id;
            createdDetail = await this.invoiceDetailRespository.create(detail);
        }

        return createdInvoice;
    }


    invoiceReport = async (invoiceId: string, res: any): Promise<void> => {
        let invoice = await this.invoiceRespository.findById(this.toObjectId(invoiceId));
        if (!invoice) {
            logger.error("Invoice Not Found");
        }
        const base = path.resolve('./src/report');
        console.log(base);
        const options: CreateOptions = {
            base: `file://${base}/`,
            type: "pdf",
            "format": "Letter",
            "orientation": "portrait"
        }
        this.reportService.toPdf(`${base}/invoice.html`, invoice, options, res);

    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }


}


Object.seal(InvoiceService);
export = InvoiceService;

