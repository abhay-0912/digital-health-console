const { Appointment } = require('../models');

async function bookAppointment(req, res) {
  try {
    const { doctorId, time } = req.body;
    const patientId = req.user.id;
    const appt = await Appointment.create({ patientId, doctorId, time });
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function listAppointments(req, res) {
  try {
    const userId = req.user.id;
    // show appointments where user is patient or doctor
    const appts = await Appointment.findAll({
      where: {
        // Sequelize OR omitted for brevity; filter in JS for now
      },
      order: [['time', 'ASC']],
    });
    // simple filter
    const filtered = appts.filter(a => a.patientId === userId || a.doctorId === userId);
    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { bookAppointment, listAppointments };
