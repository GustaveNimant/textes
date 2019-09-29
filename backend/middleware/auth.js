const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { 
    try {
	console.log('Entrée dans middleware.auth.js avec req.body', req.body);
	console.log('Entrée dans middleware.auth.js req.headers', req.headers);

	const authHeader = req.headers.authorization;
	const token = authHeader.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

	console.log('Dans middleware.auth.js authHeader', authHeader);
	console.log('Dans middleware.auth.js decodedToken',decodedToken);
	
	const userId = decodedToken.userId;
	console.log('Dans middleware.auth.js token >',token,'<');
	console.log('Dans middleware.auth.js decodedToken.userId',userId);
	console.log('Dans middleware.auth.js req.body.userId', req.body.userId);
	
	if (req.body.userId && req.body.userId !== userId) {
	    throw 'Dans middleware.auth.js : userId invalide';
	} else {
	    console.log('Dans middleware.auth.js : aller à next()');
	    next();
	}
    } catch {
	console.log('Dans middleware.auth.js Erreur 401');
	res.status(401).json({
	    error: new Error('Dans middleware.auth.js Erreur: requête invalide!')
	});
    }
};

