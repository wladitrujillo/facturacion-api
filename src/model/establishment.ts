import { Document, Schema, Model, model } from "mongoose";

export interface IEstablishment extends Document {
    code: String;
    name: String;
    phone: String;
    address: String;
    active: Boolean;

}

let EstablishmentSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    address: {
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
EstablishmentSchema.index({ company: 1, code: 1 }, { unique: true });

export const Establishment: Model<IEstablishment> = model<IEstablishment>("Establishment", EstablishmentSchema);

