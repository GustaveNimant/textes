const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const participantSchema = new Schema({
    nom: { type: String, required: true},
    prenom: { type: String, required: true},
    pseudo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    clePublique: { type: String, required:true, unique: true },
    userId: { type: String, required:true, unique: true },
},{
    collection : 'participant_c'			    
});

participantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('participantMongooseModel', participantSchema);
