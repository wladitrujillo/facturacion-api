import { Document, Schema, Model, model } from "mongoose";
import { IEnterprise } from "./enterprise";
import { IBranch } from "./branch";
import { ICustomer } from "./customer";
import { IProduct } from "./product";

export interface IDetail extends Document {
    product: IProduct | string;
    count: number;
    total: number;

}

export interface IInvoice extends Document {
    enterprise: IEnterprise | string;
    branch: IBranch | string;
    customer: ICustomer | string;
    secuence: string;
    createdAt: Date;
    totalWithoutTax: number;
    total: number;
    detail: IDetail[];
}

let InvoiceSchema = new Schema({
    enterprise: {
        type: Schema.Types.ObjectId,
        ref: 'Enterprise',
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
    discount: {
        type: Number,
        required: false
    },
    detail:
        [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                count: {
                    type: Number,
                    required: true
                },
                total: {
                    type: Number,
                    required: true,
                    default: 0.0
                }

            }
        ]

});


InvoiceSchema.index({ enterprise: 1, secuence: 1 }, { unique: true });

export const Invoice: Model<IInvoice> = model<IInvoice>("Invoice", InvoiceSchema);

