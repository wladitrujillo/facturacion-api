import InvoiceRepository from "./../repository/invoice.repository";
import BranchRepository from "./../repository/branch.repository";
import EstablishmentRepository from "./../repository/establishment.repository";
import { IInvoice } from "../model/invoice";
import CrudService from "./crud.service";
import { IBranch } from "../model/branch";
import { IEstablishment } from "../model/establishment";


class InvoiceService extends CrudService<IInvoice> {


    private branchRepository: BranchRepository;
    private establishmentRepository: EstablishmentRepository;
    constructor() {
        super(new InvoiceRepository());
        this.branchRepository = new BranchRepository();
        this.establishmentRepository = new EstablishmentRepository();
    }


    createInvoice = async (branchId: string, invoice: IInvoice): Promise<IInvoice> => {

        let branch: IBranch = await this.branchRepository.findById(branchId);      
        let establishment: IEstablishment = await this.establishmentRepository.findById(branch.establishment.toString());        
        branch.next = branch.next + 1;
        await this.branchRepository.update(branch._id, branch);
        invoice.branch = branchId;
        invoice.secuence = establishment.code + "-" + branch.code +"-"+ "0".repeat(5) + branch.next;
        return this._repository.create(invoice);
    }

}


Object.seal(InvoiceService);
export = InvoiceService;