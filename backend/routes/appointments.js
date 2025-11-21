const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { bookAppointment, listAppointments } = require('../controllers/appointmentController');

router.post('/book', authenticate, bookAppointment);
router.get('/', authenticate, listAppointments);

module.exports = router;
