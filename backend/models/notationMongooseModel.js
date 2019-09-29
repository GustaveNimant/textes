const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const notationSchema = new Schema({
    texteTitre: { type: String, required: true},
    texteObjectId: { type: String, required: true},
    participantPseudo: { type: String, required: true},
    participantId: { type: String, required: true},
    date: { type: String, required: true}, /* créée par Service */
    note: { type: Number},
},{
    collection : 'notation_c'			    
});

module.exports = mongoose.model('notationMongooseModel', notationSchema);
