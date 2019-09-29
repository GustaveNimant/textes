const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const texteCtrl = require('../controllers/texteCtrl');

router.get('/', texteCtrl.getAllTexteCtrl);
router.post('/', auth, texteCtrl.createTexteCtrl); /* post route modified */
router.post('/:id', auth, texteCtrl.createTexteVersionCtrl); /* post route modified */ 
router.get('/:id', texteCtrl.getOneTexteCtrl);
router.put('/:id', auth, multer, texteCtrl.modifyTexteCtrl);  /* put  route modified */
router.delete('/:id', auth, texteCtrl.deleteTexteCtrl);

module.exports = router;
