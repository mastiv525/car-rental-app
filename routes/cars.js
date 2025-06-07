// routes/cars.js
const express = require('express');
const router = express.Router();

// Pobieramy funkcje z modelu Car
const { createCar, getAllCars } = require('../models/Car');

// Endpoint GET /api/cars - pobiera listę wszystkich samochodów
router.get('/', async (req, res) => {
  try {
    const cars = await getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd podczas pobierania samochodów.' });
  }
});

// Endpoint POST /api/cars - dodaje nowy samochód
router.post('/', async (req, res) => {
  try {
    const carData = req.body;
    const newCar = await createCar(carData);
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd podczas dodawania samochodu.' });
  }
});

module.exports = router;

/* Co tu robimy?

Tworzymy trasę GET, która zwraca wszystkie samochody, oraz trasę POST, która umożliwia dodanie nowego samochodu przyjmując dane z ciała żądania.

*/