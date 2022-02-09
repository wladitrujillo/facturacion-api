import InvoiceRepository from "./../repository/invoice.repository";
import BranchRepository from "./../repository/branch.repository";
import EstablishmentRepository from "./../repository/establishment.repository";
import { IInvoice, Invoice } from "../model/invoice";
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
import CatalogRepository from '../repository/catalog.repository';

const logger = getLogger("InvoiceService");

class InvoiceService {


    private branchRepository: BranchRepository;
    private establishmentRepository: EstablishmentRepository;
    private invoiceRespository: InvoiceRepository;
    private invoiceDetailRespository: InvoiceDetailRepository;
    private customerRepository: CustomerRepository;
    private reportService: ReportService;
    private catalogRepository: CatalogRepository;
    private emailService: EmailService;
    constructor() {
        this.branchRepository = new BranchRepository();
        this.establishmentRepository = new EstablishmentRepository();
        this.invoiceRespository = new InvoiceRepository();
        this.invoiceDetailRespository = new InvoiceDetailRepository();
        this.customerRepository = new CustomerRepository();
        this.reportService = new ReportService();
        this.catalogRepository = new CatalogRepository();
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
        let customer: ICustomer = await this.customerRepository.findById(this.toObjectId(invoice.customer));
        invoice.establishment = establishment._id;
        invoice.branch = branchId;
        invoice.secuence = establishment.code + "-" + branch.code + "-" + "0".repeat(5) + branch.next;
        invoice.firstName = customer.firstName;
        invoice.lastName = customer.lastName;
        invoice.taxId = customer.taxId;

        let createdInvoice = await this.invoiceRespository.create(invoice);
        let createdDetail;
        for (let detail of invoice.detail) {
            detail.company = createdInvoice.company;
            detail.invoice = createdInvoice._id;
            createdDetail = await this.invoiceDetailRespository.create(detail);
        }


        const isWin = process.platform === "win32";
        let base = path.join(__dirname, '../report');
        if (isWin) base = base.replace(/\\/g, '/');

        logger.debug('Base', base);
        const options: CreateOptions = {
            base: 'file://' + base + path.sep,
            type: 'pdf',
            orientation: 'portrait'
        }
        logger.debug('options', options);
        let invoiceFound = await this.invoiceRespository.findById(this.toObjectId(createdInvoice._id));
        let filePath = path.join(__dirname, '../../pdf');
        let fileName = invoice.secuence + '.pdf';
        logger.debug("filePath", filePath, "fileName", fileName);
        let paymentTypes = await this.catalogRepository.findOne({ name: 'payment_method' });
        await this.reportService.toFile(`${base}/invoice.html`, { invoice: invoiceFound, paymentTypes }, options, filePath + '/' + fileName);

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
        const isWin = process.platform === "win32";
        let base = path.join(__dirname, '../report');
        if (isWin) base = base.replace(/\\/g, '/');
        const options: CreateOptions = {
            base: 'file://' + base + path.sep,
            type: 'pdf',
            orientation: 'portrait'
        }
        let paymentTypes = await this.catalogRepository.findOne({ name: 'payment_method' });
        await this.reportService.toStream(`${base}/invoice.html`, { invoice, paymentTypes }, options, res);

    }


    async queryInvoice(company: string, criteria: any, pageRequest: PageRequest): Promise<any> {

        criteria['company'] = company;

        for (const property in criteria) {
            if (this.isObjetcId(criteria[property])) {
                criteria[property] = this.toObjectId(criteria[property]);
            }

            if (property == 'createdAt') {
                if (criteria[property].$gte)
                    criteria[property].$gte = new Date(criteria[property].$gte)
                if (criteria[property].$gt)
                    criteria[property].$gt = new Date(criteria[property].$gt)
                if (criteria[property].$lte)
                    criteria[property].$lte = new Date(criteria[property].$lte)
                if (criteria[property].$lt)
                    criteria[property].$lt = new Date(criteria[property].$lte)
            }

        }

        let searchFilter: any[] = [
            {
                $match: criteria
            },
            {
                $skip: pageRequest.pageSize * pageRequest.page
            },
            {
                $limit: pageRequest.pageSize
            }
        ];


        if (pageRequest.sort) {

            let sortFilter: any = {}
            let fields = pageRequest.sort.split(',');

            fields.forEach(field => {
                let order = field.indexOf('-') >= 0 ? -1 : 1;
                sortFilter[field.replace(/\+|\-/ig, '')] = order;
            });

            searchFilter.push({ $sort: sortFilter });

        }

        let total = await Invoice.countDocuments(criteria);

        let data = await Invoice.aggregate(searchFilter);

        return { total, data };

    }


    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }

    private isObjetcId(_id: string): boolean {
        return Types.ObjectId.isValid(_id);
    }


}


Object.seal(InvoiceService);
export = InvoiceService;

