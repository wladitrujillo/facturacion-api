'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let TaxSchema = new Schema({
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


TaxSchema.index({ name: 1 }, { unique: true });

let Tax = module.exports = mongoose.model('Tax', TaxSchema);

let TaxValueSchema = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true
    },
    tax: {
        type: Schema.Types.ObjectId,
        ref: 'Tax',
        required: true
    },
    percentage: {
        type: Number,
        required: true,
        trim: true
    },
    retention: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
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


TaxValueSchema.index({ _id: 1, tax: 1 }, { unique: true });

let TaxValue = module.exports = mongoose.model('TaxValue', TaxValueSchema);


const iva_values = [
    { _id: '0', percentage: 0, retention: 0, description: '0%', type: 'I', active: true },
    { _id: '1', percentage: 0, retention: 30, description: '30%', type: 'R', active: false },
    { _id: '2', percentage: 12, retention: 70, description: '12%', type: 'I', active: true },
    { _id: '3', percentage: 14, retention: 70, description: '14%', type: 'I', active: false },
    { _id: '6', percentage: 0, retention: 0, description: 'NO OBJETO DE IMPUESTO', type: 'I', active: true },
    { _id: '7', percentage: 0, retention: 0, description: 'EXCEPTO%', type: 'I', active: true },
    { _id: '8', percentage: 12, retention: 70, description: '12%', type: 'A', active: false }
]

const irbpnr_values = [
    { _id: '5001', percentage: 0, retention: 0, description: 'BOTELLAS PLASTICAS NO RETORNABLES', type: 'B', active: true }
]

const ice_values = [
    { _id: '3011', percentage: 0, retention: 0, description: 'ICE-CIGARRILLOS-RUBIOS', type: 'I', active: true },
    { _id: '3021', percentage: 0, retention: 0, description: 'ICE-CIGARRILLOS-NEGROS', type: 'I', active: true },
    { _id: '3023', percentage: 150, retention: 0, description: 'ICE-PRODUCTOS DEL TABACO Y SUS SUCEDANIOS DEL TABACO EXCEPTO CIGARILLOS', type: 'I', active: true },
    { _id: '3031', percentage: 0, retention: 0, description: 'ICE-ALCOHOL Y PRODUCTOS DE ALCOHOL DISTINTOS A LA CERVEZA', type: 'I', active: true },
    { _id: '3041', percentage: 0, retention: 0, description: 'ICE-CERVEZA', type: 'I', active: true },
    { _id: '3051', percentage: 10, retention: 0, description: 'ICE-BEBIDAS GASEOSAS', type: 'I', active: true }

]


let create = async (name, list) => {

    let taxFound = await Tax.findOne({ name: name });

    if (taxFound) {
        await TaxValue.deleteMany({ tax: taxFound._id });
        await Tax.deleteOne({ _id: taxFound._id });
    }

    let tax = await Tax.create({ name: name });

    for (let taxValue of list) {
        taxValue.tax = tax._id;
        await TaxValue.create(taxValue);

    }

}

let createTaxValues = async () => {

    await create("IVA", iva_values);
    await create("ICE", ice_values);
    await create("IRBPNR", irbpnr_values);
}


module.exports.createTaxValues = createTaxValues;
