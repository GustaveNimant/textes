const texteModel = require('../models/texteModel');
const Debug = require('../models/debug');

exports.createTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.createTexteCtrl avec req.body ', req.body)};

    const texte = new texteModel({
	titre: req.body.titre,
	contenu: req.body.contenu,
	shasum: req.body.shasum,
	noteMoyenne: req.body.noteMoyenne,
	noteEcartType: req.body.noteEcartType,
	auteurId: req.body.auteurId,
	imageUrl: req.body.imageUrl
    });
    
    texte.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans texteCtrl.js.createTexteCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.createTexteWithImageCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.createTexteWithImageCtrl avec req.body ', req.body)};

/* multer provision */
    req.body.texte = JSON.parse(req.body.texte); /* string => JSON */
    const url = req.protocol + '://' + req.get('host');

    if (Debug.debug) {console.log('Dans texteCtrl.js.createTexteWithImageCtrl url', url)};
    const imageUrl = url + '/images/' + req.file.filename;
/* end of multer provision */

    if (Debug.debug) {console.log('Dans texteCtrl.js.createTexteWithImageCtrl imageUrl', imageUrl)};
    if (Debug.debug) {console.log('Dans texteCtrl.js.createTexteWithImageCtrl req.body.texte', req.body.texte)};

    const o = {
	titre:req.body.texte.titre,
	contenu:req.body.texte.contenu,
	auteurId:req.body.texte.auteurId
    };
    if (Debug.debug) {console.log('o',o)};

    const texte = new texteModel({
	titre: req.body.texte.titre,
	contenu: req.body.texte.contenu,
	noteMoyenne: req.body.texte.noteMoyenne,
	noteEcartType: req.body.texte.noteEcartType,
	auteurId: req.body.texte.auteurId,
	imageUrl: imageUrl
    });

    if (Debug.debug) {console.log('Dans texteCtrl.js.createTexteWithImageCtrl texte', texte)};
    
    texte.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans texteCtrl.js.createTexteCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getOneTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.getOneTexteCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.getOneTexteCtrl avec req.params.id ', req.params.id)};
    
    texteModel.findOne({
	_id: req.params.id
    })
	.then(
	    (texte) => {
		res.status(200).json(texte);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

exports.modifyTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.modifyTexteCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.modifyTexteCtrl avec req.params.id ', req.params.id)};
    
    const texte = new texteModel({
	_id: req.params.id, /* to keep the_id */
	titre: req.body.titre,
	contenu: req.body.contenu,
	shasum: req.body.shasum,
	noteMoyenne: req.body.noteMoyenne,
	noteEcartType: req.body.noteEcartType,
	auteurId: req.body.auteurId,
	imageUrl: req.body.imageUrl,
	__v: req.body.__v
    });

    if (Debug.debug) {console.log('Dans texteCtrl.js.modifyTexteCtrl texte ', texte)};
    
    texteModel.updateOne({_id: req.params.id}, texte)  /* version updated ??? */
	.then(
	    () => {
		res.status(201).json({
		    message: 'texteCtrl.js.modifyTexteCtrl le texte a été mis à jour!'
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

exports.deleteTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.deleteTexteCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.deleteTexteCtrl avec req.params.id ', req.params.id)};
    
    texteModel.deleteOne({_id: req.params.id})
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

exports.deleteTexteWithImageCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.deleteTexteWithImageCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.deleteTexteWithImageCtrl avec req.params.id ', req.params.id)};
    
    texteModel.findOne({_id: req.params.id}).
	then(
	    (tex) => {
		const filename = tex.imageUrl.split('/images/')[1];
		if (Debug.debug) {console.log('Dans texteCtrl.js.deleteTexteWithImageCtrl filename', filename)};

		fs.unlink('images/' + filename, () => {
		    texteModel.deleteOne({_id: req.params.id}).then(
			() => {
			    res.status(200).json({
				message: 'File '+filename+' Deleted!'
			    });
			}
		    ).catch(
			(error) => {
			    res.status(400).json({
				error: error
            });
			}
		    );
		});
	    }
	);
};

exports.getAllTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.getAllTexteCtrl avec req.body ', req.body)};

    texteModel.find()
	.then(
	    (des_textes) => {
		res.status(200).json(des_textes);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.modifyTexteWithImageCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.modifyTexteWithImageCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.modifyTexteWithImageCtrl avec req.params.id ', req.params.id)};
    
    let texte = new texteModel({_id: req.params.id}); /* to keep the_id */
    if (Debug.debug) {console.log('Dans texteCtrl.js.modifyTexteWithImageCtrl texte', texte)};

    if (Debug.debug) {console.log('Dans texteCtrl.js.modifyTexteWithImageCtrl req.file', req.file)};
    if (req.file) {
	const url = req.protocol + '://' + req.get('host');
	if (Debug.debug) {console.log('Dans texteCtrl.js.modifyTexteWithImageCtrl url', url)};

	req.body.texte = JSON.parse(req.body.texte);
	texte = {
	    _id: req.params.id,
	    titre: req.body.texte.titre,
	    contenu: req.body.texte.contenu,
	    imageUrl: url + '/images/' + req.file.filename,
	    noteMoyenne: req.body.texte.noteMoyenne,
	    noteEcartType: req.body.texte.noteEcartType,
	    shasum: req.body.texte.shasum,
	    auteurId: req.body.texte.auteurId
    };
    } else {
	texte = {
	    _id: req.params.id,
	    titre: req.body.titre,
	    contenu: req.body.contenu,
	    imageUrl: req.body.imageUrl,
	    noteMoyenne: req.body.noteMoyenne,
	    noteEcartType: req.body.texte.noteEcartType,
	    shasum: req.body.texte.shasum,
	    auteurId: req.body.auteurId
	};
    }
    if (Debug.debug) {console.log('Dans texteCtrl.js.modifyTexteWithImageCtrl avant updateOne texte', texte)};
    texteModel.updateOne({_id: req.params.id}, texte)
	.then(
	    () => {
		res.status(201).json({
		    message: 'texteModel updated successfully!'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans texteCtrl.js.modifyTexteWithImageCtrl Erreur', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};


