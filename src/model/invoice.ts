import { Document, Schema, Model, model } from "mongoose";
import { IBranch } from "./branch";
import { ICompany } from "./company";
import { IEstablishment } from "./establishment";
import { IInvoiceDetail } from "./invoice-detail";

export interface IInvoice extends Document {
    company: ICompany | string;
    establishment: IEstablishment;
    branch: IBranch | string;
    customer: string;
    firstName: string;
    lastName: string;
    taxId: string;
    secuence: string;
    createdAt: Date;
    totalWithoutTax: number;
    total: number;
    detail: IInvoiceDetail[];
    payments: IPayment[];
}

export interface IPayment {
    code: string;
    description: string;
    value: number;
}

let InvoiceSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
        required: true
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    taxId: {
        type: String,
        required: true
    },
    secuence: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
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
    },
    detail: {
        type: Schema.Types.Array,
        ref: 'InvoiceDetail'
    },
    payments: [{
        code: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        value: {
            type: Number,
            required: true,
            default: 0
        }
    }]
});


InvoiceSchema.index({ company: 1, secuence: 1 }, { unique: true });

export const Invoice: Model<IInvoice> = model<IInvoice>("Invoice", InvoiceSchema);

