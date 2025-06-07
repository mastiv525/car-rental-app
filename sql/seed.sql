TRUNCATE TABLE public.Reservations, public.Cars, public.Users RESTART IDENTITY CASCADE;

-- Wstaw przykładowych użytkowników
-- UWAGA: Hasła muszą być zahaszowane, aby logowanie przez API działało poprawnie.
-- Poniższe wartości to przykładowe hasło "tajnehaslo" (zahaszowane przy użyciu bcrypt z 10 rundami).
INSERT INTO public.Users (name, email, password, role) VALUES
  ('Jan Kowalski', 'jan@example.com', '$2b$10$S1n2JY4E1cT1lC9TQ8iNUeQnU6PD/mH7qR7bz1B8x9KzQY9A/0QO2', 'user'),
  ('Anna Nowak', 'anna@example.com', '$2b$10$S1n2JY4E1cT1lC9TQ8iNUeQnU6PD/mH7qR7bz1B8x9KzQY9A/0QO2', 'user'),
  ('Admin User', 'admin@example.com', '$2b$10$S1n2JY4E1cT1lC9TQ8iNUeQnU6PD/mH7qR7bz1B8x9KzQY9A/0QO2', 'admin');

-- Wstaw przykładowe samochody
-- Teraz obrazki wskazują na lokalny folder w aplikacji (np. "images/cars/")
INSERT INTO public.Cars (brand, model, year, price, availability, description, image_url) VALUES
  ('Toyota', 'Corolla', 2020, 100.00, true, 'Niezawodny i oszczędny', 'images/cars/toyota_corolla.jpg'),
  ('Ford', 'Focus', 2019, 90.00, true, 'Przestronny i wygodny', 'images/cars/ford_focus.jpg'),
  ('BMW', '320i', 2021, 150.00, true, 'Luksusowy samochód', 'images/cars/bmw_320i.jpg');

-- Wstaw przykładowe rezerwacje
INSERT INTO public.Reservations (user_id, car_id, start_date, end_date, status) VALUES
  (1, 1, '2023-04-01', '2023-04-05', 'active'),
  (2, 2, '2023-04-10', '2023-04-15', 'active');
