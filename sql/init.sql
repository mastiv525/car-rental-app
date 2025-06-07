-- Tworzenie tabeli Users (Użytkownicy)
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);

-- Tworzenie tabeli Cars (Samochody)
CREATE TABLE IF NOT EXISTS Cars (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT,
  price NUMERIC(10, 2) NOT NULL,
  availability BOOLEAN DEFAULT true,
  description TEXT,
  image_url TEXT
);

-- Tworzenie tabeli Reservations (Rezerwacje)
CREATE TABLE IF NOT EXISTS Reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
  car_id INTEGER REFERENCES Cars(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'active'
);
