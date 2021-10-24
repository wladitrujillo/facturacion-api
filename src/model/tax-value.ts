import { Document, Schema, Model, model } from "mongoose";


export interface ITaxValue extends Document {
    name: String;
    active: Boolean;
}


let TaxValueSchema = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true
    },
    tax: {
        type: Schema.Types.ObjectId,
        ref: 'Tax',
        required: true
    },
    percentage: {
        type: Number,
        required: true,
        trim: true
    },
    retention: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
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


TaxValueSchema.index({ _id: 1, tax: 1 }, { unique: true });

export const TaxValue: Model<ITaxValue> = model<ITaxValue>("TaxValue", TaxValueSchema);

