const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const texteSchema = new Schema({
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    shasum: { type: String, required: true },
    noteMoyenne: { type: Number, required: true },
    noteEcartType: { type: Number, required: true },
    auteurId: { type: String, required: true },
    texteContenuId: { type: String, required: true },
    version: { type: Number, required: true },
},{
    collection : 'texte_with_versions_c'
});

module.exports = mongoose.model('texteMongooseModel', texteSchema);
