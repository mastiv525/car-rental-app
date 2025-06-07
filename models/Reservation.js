// models/Reservation.js
const pool = require('../config/db');

// Funkcja tworząca nową rezerwację
const createReservation = async (reservation) => {
  const { user_id, car_id, start_date, end_date, status = 'active' } = reservation;
  const query = `
    INSERT INTO public.Reservations (user_id, car_id, start_date, end_date, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, [user_id, car_id, start_date, end_date, status]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Funkcja pobierająca rezerwacje dla danego użytkownika
const getReservationsByUser = async (user_id) => {
  const query = `
    SELECT * FROM public.Reservations WHERE user_id = $1;
  `;
  try {
    const result = await pool.query(query, [user_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createReservation,
  getReservationsByUser,
};

/*Co tutaj robimy?

Łączymy się z bazą przez pool.
Tworzymy funkcję createReservation do dodawania rezerwacji.
Dodajemy funkcję getReservationsByUser do pobierania rezerwacji konkretnego użytkownika.
Eksportujemy obie funkcje, aby móc je wykorzystać później.
*/