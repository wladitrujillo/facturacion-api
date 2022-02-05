import { Document, Model, Schema, model } from 'mongoose';

export interface IProductCategory extends Document {
    name: string;
    description: string;
    active: string;
}


let ProductCategorySchema = new Schema({
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
    description: {
        type: String,
        required: false,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});


ProductCategorySchema.index({ company: 1, name: 1 }, { unique: true });

export const ProductCategory: Model<IProductCategory> = model<IProductCategory>('ProductCategory', ProductCategorySchema);


