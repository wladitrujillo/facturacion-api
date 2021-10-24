import { Document, Schema, Model, model } from "mongoose";
import { IRole } from "./role";

export interface IMenu extends Document {
    path: String;
    title: String;
    type: String;
    icontype: String;
    collapse?: String;
    children?: IMenu[];
    ab: string;
    parent: IMenu;
    roles: IRole[];
}

let MenuSchema = new Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    icontype: {
        type: String,
        required: false,
        trim: true
    },
    collapse: {
        type: String,
        required: false,
        trim: true
    },
    ab: {
        type: String,
        required: false,
        trim: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: false
    },
    roles: [{
        type: String,
        ref: 'Role',
        required: false
    }],
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: false
    }]
});

MenuSchema.index({ path: 1 }, { unique: true });

export const Menu: Model<IMenu> = model<IMenu>("Menu", MenuSchema);

