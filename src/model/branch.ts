import { Document, Schema, Model, model, Types } from "mongoose";

export interface IBranch extends Document {
    establishment: Types.ObjectId;
    name: string;
    code: string;
    address: string;
    next: number;
    active: boolean;
}

let BranchSchema = new Schema({
    establishment: {
        type: Types.ObjectId,
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

//crea indice 
BranchSchema.index({ establishment: 1, code: 1 }, { unique: true });

export const Branch: Model<IBranch> = model<IBranch>("Branch", BranchSchema);
