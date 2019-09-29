const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const enregistrementCtrl = require('../controllers/enregistrementCtrl');

router.get('/', enregistrementCtrl.getAllEnregistrementCtrl);
router.post('/', auth, enregistrementCtrl.createEnregistrementCtrl); /* post route modified */
router.get('/:id', enregistrementCtrl.getOneEnregistrementCtrl);
router.put('/:id', auth, multer, enregistrementCtrl.modifyEnregistrementCtrl);  /* put  route modified */
router.delete('/:id', auth, enregistrementCtrl.deleteEnregistrementCtrl);

module.exports = router;
