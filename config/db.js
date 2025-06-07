// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Jeśli korzystasz z Heroku lub potrzebujesz SSL, odkomentuj poniższą linię:
  // ssl: { rejectUnauthorized: false }
});

module.exports = pool;
