const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const notationCtrl = require('../controllers/notationCtrl');

router.get('/', notationCtrl.getAllNotationCtrl);
router.post('/', auth, notationCtrl.createNotationCtrl); 
router.get('/:id', auth, notationCtrl.getOneNotationCtrl);
router.get('/byoid/:texteObjectId', notationCtrl.getNotationsByTexteObjectIdCtrl);
router.get('/oandp/:TexteObjectIdAndParticipantId', notationCtrl.getNotationsByTexteObjectIdAndParticipantIdCtrl);
router.delete('/:id', auth, notationCtrl.deleteNotationCtrl);

module.exports = router;
