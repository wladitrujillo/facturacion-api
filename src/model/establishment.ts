import { Document, Schema, Model, model } from "mongoose";

export interface IEstablishment extends Document {
    enterprise: String;
    taxId: String;
    autorization: String;
    autorizationDate: Date;
    name: String;
    code: String,
    address: String;
    urlLogo: String;
    active: Boolean;

}

let EstablishmentSchema = new Schema({
    enterprise: {
        type: Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: true
    },    
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,       
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
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

EstablishmentSchema.index({ enterprise: 1, code: 1 }, { unique: true });

export const Establishment: Model<IEstablishment> = model<IEstablishment>("Establishment", EstablishmentSchema);

