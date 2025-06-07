// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Pobieramy funkcje z modelu użytkownika
const { createUser, findUserByEmail } = require('../models/User');

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

// Endpoint rejestracji: POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Sprawdzenie, czy użytkownik już istnieje
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik już istnieje.' });
    }

    // Szyfrowanie hasła
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tworzenie nowego użytkownika
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd podczas rejestracji.' });
  }
});

// Endpoint logowania: POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Wyszukiwanie użytkownika po emailu
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Użytkownik nie został znaleziony.' });
    }

    // Porównanie hasła wprowadzonego przez użytkownika z zaszyfrowanym hasłem w bazie
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Nieprawidłowe dane logowania.' });
    }

    // Tworzenie tokena JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd podczas logowania.' });
  }
});

module.exports = router;

/* Co tutaj robimy?

Importujemy potrzebne paczki i funkcje z modelu User.
Tworzymy dwa endpointy:
POST /api/auth/register: Odbiera dane (name, email, password), sprawdza, czy użytkownik już istnieje, szyfruje hasło i tworzy nowego użytkownika.
POST /api/auth/login: Odbiera email i hasło, wyszukuje użytkownika, porównuje hasła i tworzy token JWT, jeśli dane są poprawne.
Na końcu eksportujemy router, aby można było go podpiąć w głównym pliku aplikacji.
*/
