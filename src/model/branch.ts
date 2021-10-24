import { Document, Schema, Model, model } from "mongoose";
import { IEstablishment } from "./establishment";

export interface IBranch extends Document {
    establishment: IEstablishment | String;
    name: string;
    code: string;
    address: string;
    next: number;
    active: boolean;
}

let BranchSchema = new Schema({
    establishment: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment',
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
    next: {
        type: Number,
        required: true,
        default: 0
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }

});


BranchSchema.index({ establishment: 1, code: 1 }, { unique: true });

export const Branch: Model<IBranch> = model<IBranch>("Branch", BranchSchema);
