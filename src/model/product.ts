import { Document, Model, Schema, model, Types } from 'mongoose';
import { ITaxValue } from './tax-value';

export interface IProduct extends Document {
    _id: Types.ObjectId;
    category: Types.ObjectId;
    name: string;
    code: string;
    auxCode: string;
    description: string;
    createdAt: Date;
    active: string;
    type: string;
    price: Number;
    taxes: ITaxValue[];
}


let ProductSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
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
    }

});


ProductSchema.index({ company: 1, code: 1 }, { unique: true });

export const Product: Model<IProduct> = model<IProduct>('Product', ProductSchema);

