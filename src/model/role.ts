
import { Document, Model, Schema, model } from 'mongoose';


export interface IRole extends Document {
    name: String;
    description: String;
    active: String;
}

const RoleSchema = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true
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
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

RoleSchema.index({ name: 1 }, { unique: true });


export const Role: Model<IRole> = model<IRole>('Role', RoleSchema);

