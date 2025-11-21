const { HealthRecord, Appointment, Prescription, User } = require('../models');

async function patientDashboard(req, res) {
  try {
    const userId = req.user.id;
    const records = await HealthRecord.findAll({ where: { userId }, order: [['date','DESC']] });
    const appointments = await Appointment.findAll({ where: { patientId: userId }, order: [['time','ASC']] });
    const prescriptions = await Prescription.findAll({ where: { patientId: userId }, order: [['id','DESC']] });
    res.json({ records, appointments, prescriptions });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
}

async function doctorDashboard(req, res) {
  try {
    const doctorId = req.user.id;
    const appointments = await Appointment.findAll({ where: { doctorId }, order: [['time','ASC']] });
    const prescriptions = await Prescription.findAll({ where: { doctorId }, order: [['id','DESC']] });
    // derive unique patient IDs from appointments
    const patientIds = [...new Set(appointments.map(a => a.patientId))];
    const patients = await User.findAll({ where: { id: patientIds } });
    res.json({ appointments, prescriptions, patients });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { patientDashboard, doctorDashboard };
