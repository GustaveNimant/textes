const express = require('express');
const router = express.Router();

const participantCtrl = require('../controllers/participantCtrl');

router.get('/',   participantCtrl.getAllParticipant);
router.post('/',  participantCtrl.createParticipant);
router.get('/:id',   participantCtrl.getOneParticipant);
router.put('/:id',  participantCtrl.modifyParticipant);
router.delete('/:id',   participantCtrl.deleteParticipant);

module.exports = router;
