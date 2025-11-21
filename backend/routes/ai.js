const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { analyzeSymptoms } = require('../controllers/aiController');

router.post('/analyze', authenticate, analyzeSymptoms);

module.exports = router;
