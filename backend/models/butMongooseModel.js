const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enregistrementSchema = new Schema({
    texteObjectId: { type: String, required: true },
    assertionList: { type: [String], required: true },
},{
    collection : 'but_c'
});

module.exports = mongoose.model('enregistrementMongooseModel', enregistrementSchema);
