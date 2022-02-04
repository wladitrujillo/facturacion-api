import { Document, model, Model, Schema } from "mongoose";

export interface IState extends Document {
    name: string
}

let StateSchema = new Schema({
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cities: {
        type: Schema.Types.Array,
        ref: 'City'
    }
});


StateSchema.index({ country: 1, name: 1 }, { unique: true });

export const State: Model<IState> = model<IState>("State", StateSchema);

