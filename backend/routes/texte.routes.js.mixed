const express = require('express');
const router = express.Router();

const texteCtrl = require('../controllers/texteCtrl');
const auth = require('../middleware/auth');

router.get('/',   texteCtrl.getAllTexte);
router.get('/:id',   texteCtrl.getOneTexte);

router.post('/', auth,  texteCtrl.createTexte);
router.put('/:id', auth,  texteCtrl.modifyTexte);
router.delete('/:id', auth,   texteCtrl.deleteTexte);

module.exports = router;
