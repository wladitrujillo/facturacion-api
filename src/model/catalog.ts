import { Document, Schema, Model, model } from "mongoose";


export interface ICatalog extends Document {
    table: String;
    code: String;
    value: String;
    active: Boolean;

}


let CatalogSchema = new Schema({
    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true

    }

});


CatalogSchema.index({ table: 1, code: 1 }, { unique: true });

export const Catalog: Model<ICatalog> = model<ICatalog>("Catalog", CatalogSchema);

