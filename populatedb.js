#! /usr/bin/env node

//This script populates roles and menus, to database. Specified database 
//as argument - e.g.: node populatedb mongodb://localhost:27017/invoiceweb

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var mongoDB = userArgs[0];

if (!mongoDB || !mongoDB.startsWith('mongodb')) {
  console.error(`ERROR: You need to specify a valid mongodb URL as the first argument 
  e.g.: node populatedb mongodb://localhost:27017/facturacion`);
  return
}


const mongoose = require('mongoose');

mongoose.connect(mongoDB, {});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('connected', () => console.log("Connection to database successfull"));
db.on('error', () => console.error.bind(console, 'MongoDB connection error:'));
db.on('disconnected', () => console.log("Disconnected from database"));


const Role = require('./scripts/role');
const Menu = require('./scripts/menu');
const Catalog = require('./scripts/catalog');
const Tax = require('./scripts/tax');
const Country = require('./scripts/ecuador.country');

let fillData = async () => {

  await Role.createRoles(); 
  await Menu.createMenuItems();
  await Catalog.createCatalogs();
  await Tax.createTaxValues();
  await Country.createCountry();
  // All done, disconnect from database
  mongoose.connection.close();
}


fillData();







