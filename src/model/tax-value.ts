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
        required: false,
        trim: true
    },
    percentage: {
        type: Number,
        required: true
    },
    retention: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    type: {
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

export const TaxValue: Model<ITaxValue> = model<ITaxValue>("TaxValue", TaxValueSchema);

