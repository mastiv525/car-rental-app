const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

// Utwórz instancję aplikacji express
const app = express();
const port = process.env.PORT || 5000;

// Używamy middleware
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/auth');
const carsRoutes = require('./routes/cars');
const reservationsRoutes = require('./routes/reservations');

// Ustawiamy trasy
app.use('/api/auth', authRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/reservations', reservationsRoutes);


// Udostępniamy folder z obrazami jako statyczny
app.use('/images', express.static('images'));

// Test połączenia z bazą danych
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err);
  } else {
    console.log('Połączono z bazą danych:', res.rows[0]);
  }
});

// Prosta trasa testowa
app.get('/', (req, res) => {
  res.send('Car Rental API działa!');
});

// Start serwera
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
