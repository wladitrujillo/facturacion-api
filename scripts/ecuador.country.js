'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
let Country = mongoose.model('Country', CountrySchema);

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

let State = mongoose.model('State', StateSchema);
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
let City = mongoose.model('City', CitySchema);

let createCountry = async () => {
    let country = await Country.findOne({ name: 'Ecuador' });
    if (!country) country = await Country.create({ name: 'Ecuador' })

    //Azuay
    let state = await State.findOne({ name: 'Azuay' });
    if (!state) state = await State.create({ country: country._id, name: 'Azuay' });
    await City.deleteMany({ state: state._id });
    let azuay = [
        { state: state._id, name: 'Cuenca' }, { state: state._id, name: 'Girón' }, { state: state._id, name: 'Gualaceo' }, { state: state._id, name: 'Nabón' },
        { state: state._id, name: 'Paute' }, { state: state._id, name: 'Pucará' }, { state: state._id, name: 'San Fernando' }, { state: state._id, name: 'Santa Isabel' },
        { state: state._id, name: 'Sigsig' }];
    await City.insertMany(azuay);

    //Bolivar
    state = await State.findOne({ name: 'Bolivar' });
    if (!state) state = await State.create({ country: country._id, name: 'Bolivar' });
    await City.deleteMany({ state: state._id });
    let bolivar = [{ state: state._id, name: 'Caluma' }, { state: state._id, name: 'Chillanes' }, { state: state._id, name: 'Chimbo' }, { state: state._id, name: 'Echeandía' },
    { state: state._id, name: 'Guaranda' }, { state: state._id, name: 'San Miguel' }];
    await City.insertMany(bolivar);

    //Carchi
    state = await State.findOne({ name: 'Carchi' });
    if (!state) state = await State.create({ country: country._id, name: 'Carchi' });
    await City.deleteMany({ state: state._id });
    let carchi = [{ state: state._id, name: 'Bolivar' }, { state: state._id, name: 'Carchi' }, { state: state._id, name: 'El Angel' }, { state: state._id, name: 'San Gabriel' }, { state: state._id, name: 'Tulcán' }];
    await City.insertMany(carchi);

    //Ca;ar
    state = await State.findOne({ name: 'Cañar' });
    if (!state) state = await State.create({ country: country._id, name: 'Cañar' });
    await City.deleteMany({ state: state._id });
    let caniar = [{ state: state._id, name: 'Azogues' }, { state: state._id, name: 'Biblián' }, { state: state._id, name: 'Cañar' }, { state: state._id, name: 'La Troncal' }];
    await City.insertMany(caniar);

    //Chimborazo
    state = await State.findOne({ name: 'Chimborazo' });
    if (!state) state = await State.create({ country: country._id, name: 'Chimborazo' });
    await City.deleteMany({ state: state._id });
    let chimborazo = [
        { state: state._id, name: 'Alausí' }, { state: state._id, name: 'Chambo' }, { state: state._id, name: 'Chunchi' }, { state: state._id, name: 'Colta' },
        { state: state._id, name: 'Guamote' }, { state: state._id, name: 'Guano' }, { state: state._id, name: 'Pallatanga' }, { state: state._id, name: 'Penipe' },
        { state: state._id, name: 'Riobamba' }];
    await City.insertMany(chimborazo);

    //Cotopaxi
    state = await State.findOne({ name: 'Cotopaxi' });
    if (!state) state = await State.create({ country: country._id, name: 'Cotopaxi' });
    await City.deleteMany({ state: state._id });
    let cotopaxi = [
        { state: state._id, name: 'La Maná' }, { state: state._id, name: 'Latacunga' }, { state: state._id, name: 'Pangua' }, { state: state._id, name: 'Pujilí' },
        { state: state._id, name: 'Salcedo' }, { state: state._id, name: 'Saquisilí' }];
    await City.insertMany(cotopaxi);

    //Santo Domingo
    state = await State.findOne({ name: 'Santo Domingo' });
    if (!state) state = await State.create({ country: country._id, name: 'Santo Domingo' });
    await City.deleteMany({ state: state._id });
    let santoDomingo = [
        { state: state._id, name: 'Santo Domingo' }];
    await City.insertMany(santoDomingo);

    //El Oro
    state = await State.findOne({ name: 'El Oro' });
    if (!state) state = await State.create({ country: country._id, name: 'El Oro' });
    await City.deleteMany({ state: state._id });
    let elOro = [
        { state: state._id, name: 'Arenillas' }, { state: state._id, name: 'Balsas' }, { state: state._id, name: 'Chilla' }, { state: state._id, name: 'El Guabo' },
        { state: state._id, name: 'Huaquillas' }, { state: state._id, name: 'La Victoria' }, { state: state._id, name: 'Machala' }, { state: state._id, name: 'Marcabelí' },
        { state: state._id, name: 'Pasaje' }, { state: state._id, name: 'Piñas' }, { state: state._id, name: 'Santa Rosa' }, { state: state._id, name: 'Zaruma' }];
    await City.insertMany(elOro);

    //Esmeraldas
    state = await State.findOne({ name: 'Esmeraldas' });
    if (!state) state = await State.create({ country: country._id, name: 'Esmeraldas' });
    await City.deleteMany({ state: state._id });
    let esmeraldas = [
        { state: state._id, name: 'Ciudad de Esmeraldas' }];
    await City.insertMany(esmeraldas);

    //Galapagos
    state = await State.findOne({ name: 'Galapagos' });
    if (!state) state = await State.create({ country: country._id, name: 'Galapagos' });
    await City.deleteMany({ state: state._id });
    let galapagos = [
        { state: state._id, name: 'Galápagos' }, { state: state._id, name: 'Puerto Ayora' }, { state: state._id, name: 'Puerto Baquerizo Moreno' }, { state: state._id, name: 'Puerto Villamil' }];
    await City.insertMany(galapagos);

    //Guayas
    state = await State.findOne({ name: 'Guayas' });
    if (!state) state = await State.create({ country: country._id, name: 'Guayas' });
    await City.deleteMany({ state: state._id });
    let guayas = [
        { state: state._id, name: 'Balao' }, { state: state._id, name: 'Balzar' }, { state: state._id, name: 'Colimes' }, { state: state._id, name: 'Daule' },
        { state: state._id, name: 'Durán' }, { state: state._id, name: 'El Empalme' }, { state: state._id, name: 'El Triunfo' }, { state: state._id, name: 'Guayaquil' },
        { state: state._id, name: 'Milagro' }, { state: state._id, name: 'Naranjal' }, { state: state._id, name: 'Naranjito' }, { state: state._id, name: 'Palestina' },
        { state: state._id, name: 'Pedro Carbo' }, { state: state._id, name: 'Playas' }, { state: state._id, name: 'Samborondón' }, { state: state._id, name: 'San Jacinto de Yaguachi' },
        { state: state._id, name: 'Santa Lucía' }];
    await City.insertMany(guayas);

    //Imbabura
    state = await State.findOne({ name: 'Imbabura' });
    if (!state) state = await State.create({ country: country._id, name: 'Imbabura' });
    await City.deleteMany({ state: state._id });
    let imbabura = [
        { state: state._id, name: 'Atuntaqui' }, { state: state._id, name: 'Cotacachi' }, { state: state._id, name: 'Ibarra' }, { state: state._id, name: 'Otavalo' },
        { state: state._id, name: 'Pimampiro' }, { state: state._id, name: 'Urcuquí' }];
    await City.insertMany(imbabura);

    //Loja
    state = await State.findOne({ name: 'Loja' });
    if (!state) state = await State.create({ country: country._id, name: 'Loja' });
    await City.deleteMany({ state: state._id });
    let loja = [
        { state: state._id, name: 'Alamor' }, { state: state._id, name: 'Calvas' }, { state: state._id, name: 'Catacocha' }, { state: state._id, name: 'Catamayo' },
        { state: state._id, name: 'Celica' }, { state: state._id, name: 'Chaguarpamba' }, { state: state._id, name: 'Espíndola' }, { state: state._id, name: 'Gonzanamá' },
        { state: state._id, name: 'Ciudad de Loja' }, { state: state._id, name: 'Macará' }, { state: state._id, name: 'Pindal' }, { state: state._id, name: 'Quilanga' },
        { state: state._id, name: 'Saraguro' }, { state: state._id, name: 'Sozoranga' }, { state: state._id, name: 'Urdaneta' }, { state: state._id, name: 'Zapotillo' }];
    await City.insertMany(loja);

    //Los Rios
    state = await State.findOne({ name: 'Los Rios' });
    if (!state) state = await State.create({ country: country._id, name: 'Los Rios' });
    await City.deleteMany({ state: state._id });
    let losRios = [
        { state: state._id, name: 'Baba' }, { state: state._id, name: 'Babahoyo' }, { state: state._id, name: 'Montalvo' }, { state: state._id, name: 'Palenque' },
        { state: state._id, name: 'Puebloviejo' }, { state: state._id, name: 'Quevedo' }, { state: state._id, name: 'Vinces' }];
    await City.insertMany(losRios);

    //Manabi
    state = await State.findOne({ name: 'Manabi' });
    if (!state) state = await State.create({ country: country._id, name: 'Manabi' });
    await City.deleteMany({ state: state._id });
    let manabi = [
        { state: state._id, name: 'Atahualpa' }, { state: state._id, name: 'Chone' }, { state: state._id, name: 'El Carmen' }, { state: state._id, name: 'Flavio Alfaro' },
        { state: state._id, name: 'Jipijapa' }, { state: state._id, name: 'Junín' }, { state: state._id, name: 'Manta' }, { state: state._id, name: 'Montecristi' },
        { state: state._id, name: 'Paján' }, { state: state._id, name: 'Pedernales' }, { state: state._id, name: 'Ciudad de Pichincha' }, { state: state._id, name: 'Ciudad de Portoviejo' }];
    await City.insertMany(manabi);

    //Morona Santiago
    state = await State.findOne({ name: 'Morona Santiago' });
    if (!state) state = await State.create({ country: country._id, name: 'Morona Santiago' });
    await City.deleteMany({ state: state._id });
    let moronaSantiago = [
        { state: state._id, name: 'Gualaquiza' }, { state: state._id, name: 'Limón Indanza' }, { state: state._id, name: 'Macas' }, { state: state._id, name: 'Palora' },
        { state: state._id, name: 'Ciudad de Santiago' }, { state: state._id, name: 'Sucúa' }];
    await City.insertMany(moronaSantiago);

    //Napo
    state = await State.findOne({ name: 'Napo' });
    if (!state) state = await State.create({ country: country._id, name: 'Napo' });
    await City.deleteMany({ state: state._id });
    let napo = [
        { state: state._id, name: 'Archidona' }, { state: state._id, name: 'Baeza' }, { state: state._id, name: 'El Chaco' }, { state: state._id, name: 'Tena' }];
    await City.insertMany(napo);

    //Orellana
    state = await State.findOne({ name: 'Orellana' });
    if (!state) state = await State.create({ country: country._id, name: 'Orellana' });
    await City.deleteMany({ state: state._id });
    let orellana = [
        { state: state._id, name: 'Aguarico' }, { state: state._id, name: 'La Joya de los Sachas' }, { state: state._id, name: 'Puerto Francisco de Orellana' }];
    await City.insertMany(orellana);

    //Pastaza
    state = await State.findOne({ name: 'Pastaza' });
    if (!state) state = await State.create({ country: country._id, name: 'Pastaza' });
    await City.deleteMany({ state: state._id });
    let pastaza = [
        { state: state._id, name: 'Mera' }, { state: state._id, name: 'Puyo' }];
    await City.insertMany(pastaza);

    //Pichincha
    state = await State.findOne({ name: 'Pichincha' });
    if (!state) state = await State.create({ country: country._id, name: 'Pichincha' });
    await City.deleteMany({ state: state._id });
    let pichincha = [
        { state: state._id, name: 'Aloag' }, { state: state._id, name: 'Cayambe' }, { state: state._id, name: 'Machachi' }, { state: state._id, name: 'Quito' },
        { state: state._id, name: 'San Miguel de los Bancos' }, { state: state._id, name: 'Sangolquí' }, { state: state._id, name: 'Tabacundo' }];
    await City.insertMany(pichincha);

    //Santa Elena
    state = await State.findOne({ name: 'Santa Elena' });
    if (!state) state = await State.create({ country: country._id, name: 'Santa Elena' });
    await City.deleteMany({ state: state._id });
    let santaElena = [
        { state: state._id, name: 'Salinas' }, { state: state._id, name: 'Santa Elena' }];
    await City.insertMany(santaElena);

    //Sucumbios
    state = await State.findOne({ name: 'Sucumbios' });
    if (!state) state = await State.create({ country: country._id, name: 'Sucumbios' });
    await City.deleteMany({ state: state._id });
    let sucumbios = [
        { state: state._id, name: 'Cascales' }, { state: state._id, name: 'La Bonita' }, { state: state._id, name: 'Lumbaquí' }, { state: state._id, name: 'Nueva Loja' },
        { state: state._id, name: 'Puerto el Carmen de Putumayo' }, { state: state._id, name: 'Shushufindi' }];
    await City.insertMany(sucumbios);

    //Tungurahua
    state = await State.findOne({ name: 'Tungurahua' });
    if (!state) state = await State.create({ country: country._id, name: 'Tungurahua' });
    await City.deleteMany({ state: state._id });
    let tungurahua = [
        { state: state._id, name: 'Ambato' }, { state: state._id, name: 'Ant. Baq. Moreno' }, { state: state._id, name: 'Baños' }, { state: state._id, name: 'Cevallos' },
        { state: state._id, name: 'Mocha' }, { state: state._id, name: 'Patate' }, { state: state._id, name: 'Pelileo' }, { state: state._id, name: 'Píllaro' },
        { state: state._id, name: 'Quero' }, { state: state._id, name: 'Tisaleo' }];
    await City.insertMany(tungurahua);

    //Zamora Chnchipe
    state = await State.findOne({ name: 'Zamora Chinchipe' });
    if (!state) state = await State.create({ country: country._id, name: 'Zamora Chinchipe' });
    await City.deleteMany({ state: state._id });
    let zamoraChinchipe = [
        { state: state._id, name: 'Guayzimi' }, { state: state._id, name: 'Yacuambí' }, { state: state._id, name: 'Yantzaza' }, { state: state._id, name: 'Zamora' }];
    await City.insertMany(zamoraChinchipe);
}

module.exports.createCountry = createCountry;
