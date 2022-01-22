import mongoose, { Model, Types } from "mongoose";
import { IInvoice, Invoice } from "../model/invoice";
import RepositoryBase from "./base.repository";

class InvoiceRepository extends RepositoryBase<IInvoice> {
    constructor() {
        super(Invoice);
    }

    findById(_id: Types.ObjectId): Promise<IInvoice> {

        return new Promise((resolve, reject) => {
            Invoice.findById(_id)
                .populate("company")
                .populate({ path: "branch", populate: { path: "establishment" } })
                .populate("customer")
                .populate({ path: "detail.product", model: "Product" })
                .exec((error: any, result: IInvoice) => {
                    if (error) reject(error)
                    else resolve(result);
                });
        });
    }
}

Object.seal(InvoiceRepository);
export = InvoiceRepository;