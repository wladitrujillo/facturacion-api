import { Document, Schema, Model, model, Types } from "mongoose";

export interface ICustomer extends Document {
    firstName: String;
    lastName: String;
    phone: String;
    taxId: String;
    address: String;
    email: String;
    createdAt: Date;
    active: Boolean;
}


let CustomerSchema = new Schema({
    company: {
        type: Types.ObjectId,
        ref: 'Company',
        required: true
    },
    firstName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    taxIdType: {
        type: String,
        required: true,
        trim: true
    },
    taxId: {
        type: String,
        required: true,
        minlength: [10, 'taxId not valid min lenght should be 10'],
        trim: true
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }

});


CustomerSchema.index({ company: 1, taxId: 1 }, { unique: true });

export const Customer: Model<ICustomer> = model<ICustomer>("Customer", CustomerSchema);
