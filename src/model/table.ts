import { Document, Schema, Model, model } from "mongoose";


export interface ITable extends Document {
    name: String;
    active: Boolean;
}


let TableSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true

    }

});


TableSchema.index({ name: 1 }, { unique: true });

export const Table: Model<ITable> = model<ITable>("Table", TableSchema);

