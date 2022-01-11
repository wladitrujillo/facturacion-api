
import { Document, Schema, Model, model, Types } from "mongoose";

export interface ICompany extends Document {
    _id: Types.ObjectId;
    ruc: String;
    autorization: String;
    autorizationDate: Date;
    name: String;
    address: String;
    urlLogo: String;
    email: String;
    phone: String;
    active: Boolean;

}

let CompanySchema = new Schema({
    ruc: {
        type: String,
        required: true,
        maxLength: [13, 'Maximo 13 caracteres'],
        minLength: [13, 'Minimo 13 caracteres'],
        trim: true
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    address: {
        type: String,
        required: false
    },
    urlLogo: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: false,
        trim: true
    },
    phone: {
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

//Crea indice para el codigo
CompanySchema.index({ ruc: 1 }, { unique: true });

export const Company: Model<ICompany> = model<ICompany>("Company", CompanySchema);

