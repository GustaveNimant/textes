const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const butCtrl = require('../controllers/butCtrl');

router.get('/', butCtrl.getAllButCtrl);
router.post('/', auth, butCtrl.createButCtrl); /* post route modified */
router.get('/:id', butCtrl.getOneButCtrl);
router.put('/:id', auth, multer, butCtrl.modifyButCtrl);  /* put  route modified */
router.delete('/:id', auth, butCtrl.deleteButCtrl);

module.exports = router;
