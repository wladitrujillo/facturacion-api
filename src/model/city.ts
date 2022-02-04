import { Document, model, Model, Schema } from "mongoose";

export interface ICity extends Document {
    name: string
}

let CitySchema = new Schema({
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    name: {
        type: String,
        required: true
    }
});


CitySchema.index({ state: 1, name: 1 }, { unique: true });

export const City: Model<ICity> = model<ICity>("City", CitySchema);

