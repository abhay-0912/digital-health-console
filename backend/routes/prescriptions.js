const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { createPrescription, listPrescriptions } = require('../controllers/prescriptionController');

router.post('/', authenticate, createPrescription);
router.get('/', authenticate, listPrescriptions);

module.exports = router;
