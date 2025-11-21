const { HealthRecord } = require('../models');

async function addRecord(req, res) {
  try {
    const userId = req.user.id;
    const { symptoms, vitals } = req.body;
    const rec = await HealthRecord.create({ userId, symptoms, vitals });
    res.json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function listRecords(req, res) {
  try {
    const userId = req.user.id;
    const records = await HealthRecord.findAll({ where: { userId }, order: [['date','DESC']] });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { addRecord, listRecords };
