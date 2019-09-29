const enregistrementMongooseModel = require('../models/enregistrementMongooseModel');
const Debug = require('../models/debug');

exports.createEnregistrementCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans enregistrementCtrl.js.createEnregistrementCtrl avec req.body ', req.body)};

    const enregistrement = new enregistrementMongooseModel({
	titre: req.body.titre,
	contenu: req.body.contenu,
	shasum: req.body.shasum,
	noteMoyenne: req.body.noteMoyenne,
	noteEcartType: req.body.noteEcartType,
	auteurId: req.body.auteurId,
    });
    
    enregistrement.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans enregistrementCtrl.js.createEnregistrementCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteEnregistrementCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans enregistrementCtrl.js.deleteEnregistrementCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans enregistrementCtrl.js.deleteEnregistrementCtrl avec req.params.id ', req.params.id)};
    
    enregistrementMongooseModel.deleteOne({_id: req.params.id})
	.then(
	    () => {
		res.status(200).json({
		    message: 'Deleted!'
		});
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};


exports.getOneEnregistrementCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans enregistrementCtrl.js.getOneEnregistrementCtrl avec req.params.id ', req.params.id)};
    
    enregistrementMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (tex) => {
		if (Debug.debug) {console.log('Dans enregistrementCtrl.js.getOneEnregistrementCtrl tex', tex)};
		res.status(200).json(tex);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

exports.getAllEnregistrementCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans enregistrementCtrl.js.getAllEnregistrementCtrl avec req.body ', req.body)};

    enregistrementMongooseModel.find()
	.then(
	    (des_enregistrements) => {
		res.status(200).json(des_enregistrements);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.modifyEnregistrementCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans enregistrementCtrl.js.modifyEnregistrementCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans enregistrementCtrl.js.modifyEnregistrementCtrl avec req.params.id ', req.params.id)};
    
    const enregistrement = new enregistrementMongooseModel({
	_id: req.params.id, /* to keep the_id */
	titre: req.body.titre,
	contenu: req.body.contenu,
	shasum: req.body.shasum,
	noteMoyenne: req.body.noteMoyenne,
	noteEcartType: req.body.noteEcartType,
	auteurId: req.body.auteurId,
	__v: req.body.__v
    });

    if (Debug.debug) {console.log('Dans enregistrementCtrl.js.modifyEnregistrementCtrl enregistrement', enregistrement)};
    
    enregistrementMongooseModel.updateOne({_id: req.params.id}, enregistrement)  /* version updated ??? */
	.then(
	    () => {
		res.status(201).json({
		    message: 'enregistrementCtrl.js.modifyEnregistrementCtrl l\'enregistrement a été mis à jour!'
		});
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};




