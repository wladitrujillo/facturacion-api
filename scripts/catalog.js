'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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

let Table = module.exports = mongoose.model('Table', TableSchema);

let CatalogSchema = new Schema({
    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true,
        trim: true

    },
    active: {
        type: Boolean,
        required: true,
        default: true

    }
})


CatalogSchema.index({ table: 1, code: 1 }, { unique: true });

let Catalog = module.exports = mongoose.model('Catalog', CatalogSchema);

const payment_method = [
    { code: '01', value: 'SIN UTILIZACION DEL SISTEMA FINANCIERO' },
    { code: '15', value: 'COMPENSACION DE DEUDAS' },
    { code: '16', value: 'TARJETA DE DEBITO' },
    { code: '17', value: 'DINERO ELECTRONICO' },
    { code: '18', value: 'TRAJETA PREPAGO' },
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

    let tableFound = await Table.findOne({ name: name });

    if (tableFound) {
        await Catalog.deleteMany({ table: tableFound._id });

        await Table.deleteOne({ _id: tableFound._id });
    }

    let table = await Table.create({ name: name });

    for (let catalog of list) {
        catalog.table = table._id;
        await Catalog.create(catalog);
    }

}


let createCatalogs = async () => {
    await create('payment_method', payment_method);
    await create('identification_type', identification_type);
    await create('customer_type', customer_type);
    await create('product_type', product_type);
}



module.exports.createCatalogs = createCatalogs;

