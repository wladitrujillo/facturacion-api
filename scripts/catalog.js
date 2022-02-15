'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CatalogSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    items: {
        type: [{ code: String, value: String }],
        required: true
    }
});

CatalogSchema.index({ name: 1 }, { unique: true });

let Catalog = module.exports = mongoose.model('Catalog', CatalogSchema);

const payment_method = [
    { code: '01', value: 'SIN UTILIZACION DEL SISTEMA FINANCIERO' },
    { code: '15', value: 'COMPENSACION DE DEUDAS' },
    { code: '16', value: 'TARJETA DE DEBITO' },
    { code: '17', value: 'DINERO ELECTRONICO' },
    { code: '18', value: 'TARJETA PREPAGO' },
    { code: '19', value: 'TARJETA DE CREDITO' },
    { code: '20', value: 'OTROS CON UTILIZACION DEL SISTEMA FINANCIERO' },
    { code: '21', value: 'ENDOSO DE TITULOS' }
];

const identification_type = [
    { code: 'C', value: 'CEDULA' },
    { code: 'R', value: 'RUC' },
    { code: 'P', value: 'PASAPORTE' },
    { code: 'I', value: 'IDENTIFICACION DEL EXTERIOR' },
    { code: 'L', value: 'PLACA' }
];
const customer_type = [
    { code: 'C', value: 'CLIENTE' },
    { code: 'R', value: 'SUJETO RETENIDO' },
    { code: 'D', value: 'DESTINATARIO' }
];

const product_type = [
    { code: 'B', value: 'BIEN' },
    { code: 'S', value: 'SERVICIO' }
];

const period = [

    { code: 'DIAS', value: 'Dias' },
    { code: 'MESES', value: 'Meses' },
    { code: 'ANIOS', value: 'Años' }


]


let create = async (name, list) => {

    let catalogFound = await Catalog.findOne({ name });

    if (catalogFound) {
        await Catalog.deleteMany({ name });
    }

    await Catalog.create({ name: name, active: true, items: list });
}


let createCatalogs = async () => {
    await create('payment_method', payment_method);
    await create('identification_type', identification_type);
    await create('customer_type', customer_type);
    await create('product_type', product_type);
}



module.exports.createCatalogs = createCatalogs;

