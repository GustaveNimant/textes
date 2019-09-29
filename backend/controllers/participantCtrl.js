const participantMongooseModel = require('../models/participantMongooseModel');
const Debug = require('../models/debug');

exports.createParticipant = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans createParticipant avec req.body ', req.body)};

    const participant = new participantMongooseModel({
	nom: req.body.nom,
	prenom: req.body.prenom,
	pseudo: req.body.pseudo,
	email: req.body.email,
	password: req.body.password,
	clePublique: req.body.clePublique,
	userId: req.body.userId
    });
    
    participant.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post saved successfully!'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans participantCtrl.js.createParticipantCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getOneParticipant = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans getOneParticipant avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans getOneParticipant avec req.params.id ', req.params.id)};
    
    participantMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (participant) => {
		res.status(200).json(participant);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

exports.modifyParticipant = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans modifyParticipant avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans modifyParticipant avec req.params.id ', req.params.id)};
    
    const participant = new participantMongooseModel({
	nom: req.body.nom,
	prenom: req.body.prenom,
	pseudo: req.body.pseudo,
	email: req.body.email,
	clePublique: req.body.clePublique,
	userId: req.body.userId,
	_id: req.params.id, /* to keep the_id */
    });

    participantMongooseModel.updateOne({_id: req.params.id}, participant)
	.then(
	    () => {
		res.status(201).json({
		    message: 'participantMongooseModel updated successfully!'
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

exports.deleteParticipant = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans deleteParticipant avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans deleteParticipant avec req.params.id ', req.params.id)};
    
    participantMongooseModel.deleteOne({_id: req.params.id})
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

exports.getAllParticipant = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans getAllParticipant avec req.body ', req.body)};

    participantMongooseModel.find()
	.then(
	    (des_participants) => {
		res.status(200).json(des_participants);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};
