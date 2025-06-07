// middlewares/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Funkcja middleware weryfikująca token JWT
function verifyToken(req, res, next) {
  // Oczekujemy, że token będzie przesłany w nagłówku Authorization w formacie: "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Brak tokena. Dostęp zabroniony.' });
  }

  // Rozdzielamy token od słowa "Bearer"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Nieprawidłowy format tokena.' });
  }

  try {
    // Weryfikujemy token przy użyciu klucza z pliku .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Przechowujemy dane z tokena w obiekcie req, aby można było ich używać w dalszej części
    req.user = decoded;
    next(); // Przekazujemy kontrolę dalej do następnego middleware/endpointu
  } catch (error) {
    return res.status(401).json({ message: 'Token jest nieprawidłowy lub wygasł.' });
  }
}

module.exports = verifyToken;

/* Co robimy tutaj?

Pobieramy token z nagłówka żądania.
Weryfikujemy token przy użyciu biblioteki jsonwebtoken i naszego tajnego klucza z pliku .env.
Jeśli token jest poprawny, zapisujemy dane użytkownika w req.user i wywołujemy next(), aby przejść do kolejnego kroku.
Jeśli token nie jest poprawny, zwracamy odpowiedź 401 (nieautoryzowany).
*/