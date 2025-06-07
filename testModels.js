// testModels.js
const { createUser, findUserByEmail } = require('./models/User');

const test = async () => {
  try {
    // Test tworzenia nowego użytkownika
    const newUser = await createUser({
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      password: 'tajnehaslo'
    });
    console.log('Nowy użytkownik:', newUser);

    // Test wyszukiwania użytkownika po emailu
    const foundUser = await findUserByEmail('jan@example.com');
    console.log('Znaleziony użytkownik:', foundUser);
  } catch (error) {
    console.error('Błąd:', error);
  }
};

test();
