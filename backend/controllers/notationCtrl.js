const notationMongooseModel = require('../models/notationMongooseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Debug = require('../models/debug');

exports.createNotationCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.createNotationCtrl avec req.body ', req.body)};

    const notation = new notationMongooseModel({
	participantPseudo: req.body.participantPseudo,
	participantId: req.body.participantId,
	texteTitre: req.body.texteTitre,
	texteObjectId: req.body.texteObjectId,
	note: req.body.note,
	date: req.body.date,
    });
    
    notation.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {if (Debug.debug) {console.log('Dans notationCtrl.js.createNotationCtrl Erreur ', error)};}
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteNotationCtrl = (req, res, next) => {
    if (Debug.debug) {if (Debug.debug) {console.log('Entrée dans notationCtrl.js.deleteNotationCtrl avec req.body ', req.body)};}
    if (Debug.debug) {if (Debug.debug) {console.log('Entrée dans notationCtrl.js.deleteNotationCtrl avec req.params.id ', req.params.id)};}
    
    notationMongooseModel.deleteOne({_id: req.params.id})
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

exports.getAllNotationCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getAllNotationCtrl avec req.body ', req.body)};

    notationMongooseModel.find()
	.then(
	    (not_a) => {
		if (Debug.debug) {console.log('Dans notationCtrl.js.getAllNotationCtrl not_a', not_a)};
		res.status(200).json(not_a);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getOneNotationCtrl = (req, res, next) => {
    if (Debug.debug) {if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getOneNotationCtrl avec req.body ', req.body)};}
    if (Debug.debug) {if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getOneNotationCtrl avec req.params.id ', req.params.id)};}
    
    notationMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (not) => {
		if (Debug.debug) {console.log('Dans notationCtrl.js.getOneNotationCtrl not', not)};
		res.status(200).json(not);
		
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

exports.getNotationsByTexteObjectIdCtrl = (req, res, next) => {
    
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getNotationsByTexteObjectIdCtrl avec req.params ', req.params)};
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getNotationsByTexteObjectIdCtrl avec req.params.texteObjectId ', req.params.texteObjectId)};

    notationMongooseModel.find(req.params)
	.then(
	    (not_a) => {
		if (Debug.debug) {console.log('Dans notationCtrl.js.getNotationsByTexteObjectIdCtrl not_a', not_a)};
		res.status(200).json(not_a);
		}
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getNotationsByTexteObjectIdAndParticipantIdCtrl = (req, res, next) => {
    
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getNotationsByTexteObjectIdAndParticipantIdCtrl avec req.params ', req.params)};

    
    texteObjectId = (req.params.TexteObjectIdAndParticipantId).split(':')[0];
    participantId = (req.params.TexteObjectIdAndParticipantId).split(':')[1];
    
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getNotationsByTexteObjectIdAndParticipantIdCtrl avec req.params.texteObjectId ', texteObjectId)};
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getNotationsByTexteObjectIdAndParticipantIdCtrl avec req.params.participantId ', participantId)};

    notationMongooseModel.find({texteObjectId: texteObjectId, participantId: participantId})
	.then(
	    (not_a) => {
		if (Debug.debug) {console.log('Dans notationCtrl.js.getNotationsByTexteObjectIdAndParticipantIdCtrl not_a', not_a)};
		boo = (not_a.length > 0);
		res.status(200).json(boo);
		}
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};
