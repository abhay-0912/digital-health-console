const { Sequelize } = require('sequelize');
require('dotenv').config();

// Prefer hosted Postgres (Neon / other) if URL present; otherwise fallback to SQLite.
const POSTGRES_URL = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

let sequelize;

if (POSTGRES_URL) {
  sequelize = new Sequelize(POSTGRES_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Neon uses trusted certs; this avoids SELF_SIGNED errors elsewhere
      },
    },
  });
  console.log('[database] Using Postgres connection');
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
  });
  console.log('[database] Falling back to local SQLite (no DATABASE_URL set)');
}

module.exports = sequelize;
