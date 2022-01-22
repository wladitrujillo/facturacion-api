
import { Document, Schema, Model, model } from "mongoose";
import { ICompany } from "./company";
import { IInvoice } from "./invoice";
import { IProduct } from "./product";


export interface IInvoiceDetail extends Document {
    company: ICompany | string;
    invoice: IInvoice | string;
    product: IProduct | string;
    createdAt: Date;
    price: number;
    quantity: number;
    totalWithoutTax: number;
    total: number;
}

let InvoiceDetailSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalWithoutTax: {
        type: Number,
        required: true,
        default: 0.0
    },
    total: {
        type: Number,
        required: true,
        default: 0.0
    }

});


InvoiceDetailSchema.index({ company: 1, invoice: 1, product: 1 }, { unique: true });

export const InvoiceDetail: Model<IInvoiceDetail> = model<IInvoiceDetail>("InvoiceDetail", InvoiceDetailSchema);

