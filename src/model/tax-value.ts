import { Document, Schema, Model, model } from "mongoose";


export interface ITaxValue extends Document {
    tax: String;
    code: String;
    percentage: Number;
    description: String;
    retention: Number;
    type: String;
    active: Boolean;
}


let TaxValueSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    tax: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    percentage: {
        type: Number,
        required: true
    },
    retention: {
        type: Number,
        required: true
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


TaxValueSchema.index({ company: 1 }, { unique: true });

export const TaxValue: Model<ITaxValue> = model<ITaxValue>("TaxValue", TaxValueSchema);

