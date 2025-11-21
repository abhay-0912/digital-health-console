const { Prescription } = require('../models');

async function createPrescription(req, res) {
  try {
    const doctorId = req.user.id;
    const { patientId, medicines, notes } = req.body;
    const p = await Prescription.create({ doctorId, patientId, medicines, notes });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function listPrescriptions(req, res) {
  try {
    const userId = req.user.id;
    // return prescriptions where user is patient or doctor
    const list = await Prescription.findAll();
    const filtered = list.filter(p => p.patientId === userId || p.doctorId === userId);
    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createPrescription, listPrescriptions };
