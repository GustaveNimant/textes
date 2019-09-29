const express = require('express');
const compteRoutes = express.Router();

const compteCtrl = require('../controllers/compteCtrl');
//const auth = require('../middleware/auth');

compteRoutes.post('/signup', compteCtrl.signup);
compteRoutes.post('/login', compteCtrl.login); 
compteRoutes.get('/',   compteCtrl.getAllCompteCtrl);
compteRoutes.post('/',  compteCtrl.createCompteCtrl);
compteRoutes.get('/:id',   compteCtrl.getOneCompteByAnyIdCtrl);
compteRoutes.put('/:id',  compteCtrl.modifyCompteCtrl);
compteRoutes.delete('/:id',   compteCtrl.deleteCompteCtrl);

module.exports = compteRoutes;
