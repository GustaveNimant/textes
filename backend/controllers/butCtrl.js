const butMongooseModel = require('../models/butMongooseModel');
const Debug = require('../models/debug');

exports.createButCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans butCtrl.js.createButCtrl avec req.body ', req.body)};

    const but = new butMongooseModel({
	texteObjectId: req.body.texteObjectId,
	assertionList: req.body.assertionList,
    });
    
    but.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans butCtrl.js.createButCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteButCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans butCtrl.js.deleteButCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans butCtrl.js.deleteButCtrl avec req.params.id ', req.params.id)};
    
    butMongooseModel.deleteOne({_id: req.params.id})
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


exports.getOneButCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans butCtrl.js.getOneButCtrl avec req.params.id ', req.params.id)};
    
    butMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (tex) => {
		if (Debug.debug) {console.log('Dans butCtrl.js.getOneButCtrl tex', tex)};
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

exports.getAllButCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans butCtrl.js.getAllButCtrl avec req.body ', req.body)};

    butMongooseModel.find()
	.then(
	    (des_buts) => {
		res.status(200).json(des_buts);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.modifyButCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans butCtrl.js.modifyButCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans butCtrl.js.modifyButCtrl avec req.params.id ', req.params.id)};
    
    const but = new butMongooseModel({
	texteObjectId: req.body.texteObjectId,
	assertionList: req.body.assertionList,
	_id: req.params.id, /* to keep the_id */
	__v: req.body.__v
    });

    if (Debug.debug) {console.log('Dans butCtrl.js.modifyButCtrl but', but)};
    
    butMongooseModel.updateOne({_id: req.params.id}, but)  /* version updated ??? */
	.then(
	    () => {
		res.status(201).json({
		    message: 'butCtrl.js.modifyButCtrl le but a été mis à jour!'
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




