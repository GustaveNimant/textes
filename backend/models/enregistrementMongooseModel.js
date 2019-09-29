const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enregistrementSchema = new Schema({
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    shasum: { type: String, required: true },
    noteMoyenne: { type: Number, required: true },
    noteEcartType: { type: Number, required: true },
    auteurId: { type: String, required: true },
},{
    collection : 'enregistrement_with_image_c'
});

module.exports = mongoose.model('enregistrementMongooseModel', enregistrementSchema);
