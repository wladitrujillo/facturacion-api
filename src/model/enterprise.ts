import { Document, Schema, Model, model } from "mongoose";

export interface IEnterprise extends Document {
    taxId: String
    autorization: String;
    autorizationDate: Date;
    name: String;
    description: String;
    address: String;
    active: Boolean;
    urlLogo: String;
    createdAt: Date;

}

export const EnterpriseSchema = new Schema({
    taxId: {
        type: String,
        required: true,
        unique: true,
        minlength: [13, 'RUC length not valid'],
        trim: true
    },
    autorization: {
        type: String,
        required: false,
        trim: true
    },
    autorizationDate: {
        type: Date,
        required: false,
        default: Date.now
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
    address: {
        type: String,
        required: false
    },
    active: {
        type: String,
        required: true,
        default: true
    },
    urlLogo: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

});

EnterpriseSchema.index({ taxId: 1 }, { unique: true });

export const Enterprise: Model<IEnterprise> = model<IEnterprise>('Enterprise', EnterpriseSchema);
