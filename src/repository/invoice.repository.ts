import { IInvoice, Invoice } from "../model/invoice";
import RepositoryBase from "./base.repository";

class InvoiceRepository extends RepositoryBase<IInvoice> {
    constructor() {
        super(Invoice);
    }
}

Object.seal(InvoiceRepository);
export = InvoiceRepository;