// models/User.js
// Łączymy się z bazą danych poprzez nasz plik konfiguracyjny
const pool = require('../config/db');

// Funkcja tworząca nowego użytkownika
const createUser = async (user) => {
  // Rozpakowujemy dane z obiektu user
  const { name, email, password, role = 'user' } = user;
  const query = `
    INSERT INTO public.Users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, [name, email, password, role]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Funkcja wyszukująca użytkownika po emailu (przykład)
const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM public.Users WHERE email = $1;
  `;
  try {
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Eksportujemy nasze funkcje, żeby można je było używać w innych plikach
module.exports = {
  createUser,
  findUserByEmail,
};

/*Co robimy tutaj?

Łączymy się z bazą przez pool (nasz plik z konfiguracją).
Tworzymy funkcję createUser do dodawania nowego użytkownika.
Dodajemy przykładową funkcję findUserByEmail do wyszukiwania użytkownika.
Na końcu eksportujemy te funkcje, aby były dostępne w innych częściach projektu.
*/