
import { Document, Model, Schema, model } from 'mongoose';

export interface IProduct extends Document {
    code: string;
    auxCode: string;
    name: string;
    description: string;
    active: string;
    createdAt: Date;
    price: Number;
}


let ProductSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
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

