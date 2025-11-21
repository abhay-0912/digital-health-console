// Seed demo users: one doctor and one patient
require('dotenv').config();
const { sequelize, User } = require('./models');

async function run() {
  try {
    await sequelize.sync();

    const demoUsers = [
      { name: 'Dr. Demo', email: 'doctor@example.com', password: 'Doctor123!', role: 'doctor' },
      { name: 'Patient Demo', email: 'patient@example.com', password: 'Patient123!', role: 'patient' },
    ];

    for (const u of demoUsers) {
      const existing = await User.findOne({ where: { email: u.email } });
      if (existing) {
        console.log(`Skipping existing user: ${u.email}`);
        continue;
      }
      await User.create(u);
      console.log(`Created user: ${u.email}`);
    }

    console.log('Seeding complete. You can now login with the demo credentials.');
    process.exit(0);
  } catch (e) {
    console.error('Seed failed', e);
    process.exit(1);
  }
}

run();
