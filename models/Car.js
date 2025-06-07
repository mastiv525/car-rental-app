// models/Car.js
const pool = require('../config/db');

// Funkcja dodająca nowy samochód
const createCar = async (car) => {
  const { brand, model, year, price, availability = true, description, image_url } = car;
  const query = `
    INSERT INTO public.Cars (brand, model, year, price, availability, description, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, [brand, model, year, price, availability, description, image_url]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Funkcja pobierająca wszystkie samochody
const getAllCars = async () => {
  const query = `SELECT * FROM public.Cars;`;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCar,
  getAllCars,
};

/* Co się tutaj dzieje?

Łączymy się z bazą poprzez pool.
Tworzymy funkcję createCar, która dodaje nowy samochód do tabeli.
Dodajemy funkcję getAllCars, która pobiera wszystkie samochody.
Eksportujemy obie funkcje.
*/