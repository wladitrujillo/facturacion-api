import { Document, model, Model, Schema } from "mongoose";

export interface ICountry extends Document {
    name: string
}

let CountrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    states: {
        type: Schema.Types.Array,
        ref: 'State'
    }
});


CountrySchema.index({ name: 1 }, { unique: true });

export const Country: Model<ICountry> = model<ICountry>("Country", CountrySchema);

