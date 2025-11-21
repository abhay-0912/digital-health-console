const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { addRecord, listRecords } = require('../controllers/healthController');

router.post('/', authenticate, addRecord);
router.get('/', authenticate, listRecords);

module.exports = router;
