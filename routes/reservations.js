// routes/reservations.js
const express = require('express');
const router = express.Router();

// Importujemy funkcje z modelu Reservation
const { createReservation, getReservationsByUser } = require('../models/Reservation');
// Importujemy nasz middleware
const verifyToken = require('../middlewares/auth');

// Endpoint POST /api/reservations - tworzy nową rezerwację
// Zabezpieczamy trasę, dodając middleware verifyToken
router.post('/', verifyToken, async (req, res) => {
  try {
    const reservationData = req.body;
    // Możemy użyć req.user, aby sprawdzić, który użytkownik wykonuje operację
    // np. reservationData.user_id = req.user.id; 
    const newReservation = await createReservation(reservationData);
    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd podczas tworzenia rezerwacji.' });
  }
});

// Endpoint GET /api/reservations/:user_id - pobiera rezerwacje dla danego użytkownika
// Możemy zabezpieczyć również ten endpoint
router.get('/:user_id', verifyToken, async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const reservations = await getReservationsByUser(user_id);
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd podczas pobierania rezerwacji.' });
  }
});

module.exports = router;


/* Co tu robimy?

Definiujemy trasę POST, która tworzy nową rezerwację.
Definiujemy trasę GET, która pobiera rezerwacje na podstawie identyfikatora użytkownika podanego jako parametr w URL.
*/