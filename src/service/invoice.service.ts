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
import { EmailService } from "./mail.service";
import { Email } from "../model/email";
import CustomerRepository from "../repository/customer.repository";
import { ICustomer } from "../model/customer";


const logger = getLogger("InvoiceService");

class InvoiceService {


    private branchRepository: BranchRepository;
    private establishmentRepository: EstablishmentRepository;
    private invoiceRespository: InvoiceRepository;
    private invoiceDetailRespository: InvoiceDetailRepository;
    private customerRepository: CustomerRepository;
    private reportService: ReportService;
    private emailService: EmailService;
    constructor() {
        this.branchRepository = new BranchRepository();
        this.establishmentRepository = new EstablishmentRepository();
        this.invoiceRespository = new InvoiceRepository();
        this.invoiceDetailRespository = new InvoiceDetailRepository();
        this.customerRepository = new CustomerRepository();
        this.reportService = new ReportService();
        this.emailService = new EmailService();
    }

    retrieve(criteria: any, pageRequest: PageRequest): Promise<IInvoice[]> {
        return this.invoiceRespository.retrieve(criteria, pageRequest);
    }

    findById(_id: string): Promise<IInvoice> {
        return this.invoiceRespository.findById(this.toObjectId(_id));
    }

    createInvoice = async (branchId: string, invoice: IInvoice): Promise<IInvoice> => {

        logger.debug('start createInvoice branchId:', branchId);
        let branch: IBranch = await this.branchRepository.findById(this.toObjectId(branchId));
        let establishment: IEstablishment = await this.establishmentRepository.findById(branch.establishment);
        branch.next = branch.next + 1;
        logger.debug('branch', branch);
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


        let customer: ICustomer = await this.customerRepository.findById(this.toObjectId(invoice.customer));



        const base = path.join(__dirname, '../report');
        logger.debug('Base', base);
        const options: CreateOptions = {
            base: 'file://' + base + '/',
            type: 'pdf',
            orientation: 'portrait'
        }
        let invoiceFound = await this.invoiceRespository.findById(this.toObjectId(createdInvoice._id));
        let filePath = path.join(__dirname, '../../pdf');
        let fileName = invoice.secuence + '.pdf';
        logger.debug("filePath", filePath, "fileName", fileName);
        await this.reportService.toFile(`${base}/invoice.html`, invoiceFound, options, filePath + '/' + fileName);

        let email: Email = {
            to: customer.email,
            subject: 'Factura Digital',
            template: 'invoice',
            context: {
                firstName: customer.firstName,
                lastName: customer.lastName
            },
            attachments: [{ filename: fileName, path: filePath + '/' + fileName }]
        }
        await this.emailService.sendMail(email);

        return createdInvoice;
    }


    invoiceReport = async (invoiceId: string, res: any): Promise<void> => {
        logger.debug('Start invoiceReport invoiceId:', invoiceId)
        let invoice = await this.invoiceRespository.findById(this.toObjectId(invoiceId));
        if (!invoice) {
            logger.error("Invoice Not Found");
        }
        const base = path.join(__dirname, '../report');
        logger.debug('Base', base);
        const options: CreateOptions = {
            base: 'file://' + base + '/',
            type: 'pdf',
            orientation: 'portrait'
        }
        logger.debug('Options', options);
        await this.reportService.toStream(`${base}/invoice.html`, invoice, options, res);

    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }


}


Object.seal(InvoiceService);
export = InvoiceService;

