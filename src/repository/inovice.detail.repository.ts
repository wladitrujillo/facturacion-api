import { Types } from "mongoose";
import { IInvoiceDetail, InvoiceDetail } from "../model/invoice-detail";
import RepositoryBase from "./base.repository";

class InvoiceDetailRepository extends RepositoryBase<IInvoiceDetail> {
    constructor() {
        super(InvoiceDetail);
    }

    findById(_id: Types.ObjectId): Promise<IInvoiceDetail> {

        return new Promise((resolve, reject) => {
            InvoiceDetail.findById(_id)
                .populate("company")
                .populate({ path: "invoice", populate: { path: "customer" } })
                .populate("product")
                .exec((error: any, result: IInvoiceDetail) => {
                    if (error) reject(error)
                    else resolve(result);
                });
        });
    }
}

Object.seal(InvoiceDetailRepository);
export = InvoiceDetailRepository;