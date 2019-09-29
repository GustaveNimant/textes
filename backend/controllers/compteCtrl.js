const compteMongooseModel = require('../models/compteMongooseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Debug = require('../models/debug');
const validateEmail = require('../models/outils');

exports.createCompteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.createCompteCtrl avec req.body ', req.body)};

    const compte = new compteMongooseModel({
	pseudo: req.body.pseudo,
	email: req.body.email,
	password: req.body.password,
    });
    
    compte.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans compteCtrl.js.createCompteCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteCompteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.deleteCompteCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.deleteCompteCtrl avec req.params.id ', req.params.id)};
    
    compteMongooseModel.deleteOne({_id: req.params.id})
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

exports.getAllCompteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.getAllCompteCtrl avec req.body ', req.body)};

    compteMongooseModel.find()
	.then(
	    (des_comptes) => {
		res.status(200).json(des_comptes);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getOneCompteByAnyIdCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.getOneCompteByAnyIdCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.getOneCompteByAnyIdCtrl avec req.params.id ', req.params.id)};

    let str = req.params.id;
    if (Debug.debug) {console.log('Dans compteCtrl.js.getOneCompteByAnyIdCtrl str',str)};
    if (validateEmail(str)) {
	compteMongooseModel.findOne({
	    email: str
	})
	    .then(
		(compte) => {
		    if (Debug.debug) {console.log('Dans compteCtrl.js.getOneCompteByAnyIdCtrl compte',compte)};
		    res.status(200).json(compte);
		}
	    ).catch(
		(error) => {
		    if (Debug.debug) {console.log('Dans compteCtrl.js.getOneCompteByAnyIdCtrl Erreur',error)};
		    res.status(404).json({
			error: error
		    });
		}
	);
	
    } else {
	compteMongooseModel.findOne({
	    _id: str
	})
	    .then(
		(compte) => {
		    res.status(200).json(compte);
		}
	    ).catch(
		(error) => {
		    res.status(404).json({
			error: error
		    });
		}
	    );
    }
};

exports.login = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.login avec req.body',req.body)};
    if (Debug.debug) {console.log('Dans compteCtrl.js.login req.body.email', req.body.email)};

    compteMongooseModel.findOne({ email: req.body.email }).
	then( /* mongoose method */
	    (un_compte) => {
		if (Debug.debug) {console.log('Dans compteCtrl.js.login un_compte', un_compte)};

		if (!un_compte) {
		    return res.status(401).json({
			error: new Error('Dans compteCtrl.js.login Erreur : Compte inconnu!')
		    });
		}
		if (Debug.debug) {console.log('Dans compteCtrl.js.login req.body.password', req.body.password)};
		if (Debug.debug) {console.log('Dans compteCtrl.js.login un_compte.password', un_compte.password)};
		bcrypt.compare(req.body.password, un_compte.password)
		    .then(
			(valid) => {
			    if (Debug.debug) {console.log('Dans compteCtrl.js.login bcrypt.compare est', valid)};
			    
			    if (!valid) {
				return res.status(401).json({
				    error: new Error('compteCtrl.js.login : le password est incorrect!')
				});
			    }

			    const token = jwt.sign( /* JWT encode new token */
				{ userId: un_compte._id },
				'RANDOM_TOKEN_SECRET',
				{ expiresIn: '7d' });
			    
			    if (Debug.debug) {console.log('Dans compteCtrl.js.login nouveau token', token)};
			    res.status(200).json({
				userId: un_compte._id,
				token: token
			    });   
			}
		    ).catch(
			(error) => {
			    if (Debug.debug) {console.log('Dans compteCtrl.js.login Erreur', error)};
			    res.status(500).json({
				error: error
			    });
			}
		    );
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans compteCtrl.js.login email inconnu',req.body.email)};
		res.status(500).json({
		    error: error
		});
	    }
	);
};

exports.modifyCompteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.modifyCompteCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.modifyCompteCtrl avec req.params.id ', req.params.id)};
    
    const compte = new compteMongooseModel({
	_id: req.params.id, /* to keep the_id */
	pseudo: req.body.pseudo,
	email: req.body.email,
	password: req.body.password,
    });

    compteMongooseModel.updateOne({_id: req.params.id}, compte)
	.then(
	    () => {
		res.status(201).json({
		    message: 'compteMongooseModel updated successfully!'
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

exports.signup = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans compteCtrl.js.signup avec req.body',req.body)};

    bcrypt.hash(req.body.password, 10)
	.then(
	    (a_password_hash) => {
		if (Debug.debug) {console.log('Dans compteCtrl.js.signup a_password_hash', a_password_hash)};
		if (Debug.debug) {console.log('Dans compteCtrl.js.signup req.body.password', req.body.password)};

		const compte = new compteMongooseModel({
		    pseudo: req.body.pseudo,
		    email: req.body.email,
		    password: a_password_hash
		});

		if (Debug.debug) {console.log('Dans compteCtrl.js.signup compte', compte)};
		compte.save() /* dans BD */
		    .then(
			() => {
			    res.status(201).json({
				message: 'Compte ajoutée avec succès!'
			    });
			})
		    .catch(
			(error) => {
			    if (Debug.debug) {console.log('Dans compteCtrl.js.signup a_password_hash', a_password_hash)};
			    if (Debug.debug) {console.log('Dans compteCtrl.js.signup Erreur', error)};
			    res.status(500).json({
				error: error
			    });
			});
	    }
	)
	.catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans compteCtrl.js.signup Erreur', error)};
		res.status(550).json({
		    error: error
		});
	    });
};

