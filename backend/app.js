const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Digital Health Console API is running', version: '0.1.0' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/health', require('./routes/health'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/prescriptions', require('./routes/prescriptions'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/dashboard', require('./routes/dashboard'));

let initialized = false;
async function init() {
  if (initialized) return;
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    initialized = true;
    console.log('[app] Database initialized');
  } catch (err) {
    console.error('[app] Failed DB init', err);
    throw err;
  }
}

module.exports = { app, init };
