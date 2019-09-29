const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const compteSchema = new Schema({
    pseudo: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    collection : 'compte_c'			    
});

compteSchema.plugin(uniqueValidator);

module.exports = mongoose.model('compteMongooseModel', compteSchema);
