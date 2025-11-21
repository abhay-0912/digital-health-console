const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { patientDashboard, doctorDashboard } = require('../controllers/dashboardController');

router.get('/patient', authenticate, requireRole('patient'), patientDashboard);
router.get('/doctor', authenticate, requireRole('doctor'), doctorDashboard);

module.exports = router;
