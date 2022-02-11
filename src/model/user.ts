import { Document, Schema, Model, Types, model } from "mongoose";
export interface IUser extends Document {
    _id: Types.ObjectId;
    company: Types.ObjectId;
    role: string;
    branch: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone: Number;
    urlImage: string;
    country: string;
    state: string;
    city: string;
    postal: string;
    address: string;
    about: string;
    createAt: Date;
    active: Boolean;
    hash: string;
    hasToUpdatePassword: boolean;
}

let UserSchema = new Schema({
    company: {
        type: Types.ObjectId,
        ref: 'Company',
        required: true
    },
    role: {
        type: String,
        ref: 'Role',
        required: true
    },
    branch: {
        type: Types.ObjectId,
        ref: 'Branch',
        required: false
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
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    hash: {
        type: String,
        required: true
    },
    urlImage: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    postal: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    hasToUpdatePassword: {
        type: Boolean,
        required: true,
        default: false
    },
});
UserSchema.index({ company: 1, email: 1 }, { unique: true });
//Creando un modelo
export const User: Model<IUser> = model<IUser>("User", UserSchema);

