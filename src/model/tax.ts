import { Document, Schema, Model, model } from "mongoose";


export interface ITax extends Document {
    name: String;
    active: Boolean;
}


let TaxSchema = new Schema({
    name: {
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


TaxSchema.index({ name: 1 }, { unique: true });

export const Tax: Model<ITax> = model<ITax>("Tax", TaxSchema);
