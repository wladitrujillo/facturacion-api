import { Document, Schema, Model, model } from "mongoose";
export interface IUser extends Document {
    role: String;
    firstName: string;
    lastName: string;
    email: string;
    phone: Number;
    createAt: Date;
    active: Boolean;
    hash: string;
    urlImage: string;
    country: string;
    city: string;
    postal: string;
    address: string;
}

let UserSchema = new Schema({
    role: {
        type: String,
        ref: 'Role',
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
        default: false
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
    }

});


UserSchema.index({ enterprise: 1, email: 1 }, { unique: true });

//Creating our model
export const User: Model<IUser> = model<IUser>("User", UserSchema);

