'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let RoleSchema = new Schema({
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

let Role = mongoose.model('Role', RoleSchema);


let createRoles = async () => {

    await Role.deleteMany({});

    await Role.create({
        "_id": "SUPERADMIN",
        "name": "SUPERADMIN",
        "description": "Rol super administrador",
        "active": true
    });

    await Role.create({
        "_id": "ADMIN",
        "name": "ADMIN",
        "description": "Rol administrador",
        "active": true
    });

    await Role.create({
        "_id": "USER",
        "name": "USER",
        "description": "Rol SalesMan",
        "active": true
    });
 
}

module.exports.createRoles = createRoles;
