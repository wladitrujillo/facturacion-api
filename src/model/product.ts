
import { Document, Model, Schema, model } from 'mongoose';
import { IEnterprise } from './enterprise';

export interface IProduct extends Document {
    enterprise: IEnterprise | string;
    code: string;
    auxCode: string;
    name: string;
    description: string;
    active: string;
    createdAt: Date;
    price: Number;
}


let ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: false,
        trim: true
    },
    auxCode: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    type: {
        type: String,
        required: false,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxes: [{
        type: Schema.Types.ObjectId,
        ref: 'TaxValue',
    }],
    discount: {
        type: Number,
        required: false,
        default: 0.0
    },
    enterprise: {
        type: Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: true
    }

});


ProductSchema.index({ enterprise: 1, code: 1 }, { unique: true });

export const Product: Model<IProduct> = model<IProduct>('Product', ProductSchema);

