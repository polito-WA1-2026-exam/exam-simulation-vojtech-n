// server.mjs
import app from './src/app.mjs';
import { createTables, initializeDb } from './src/config/db.mjs';
import { seedDatabase } from './src/config/seed.mjs';

const PORT = 3001;

const init = async () => {
  console.log('Database initialization...');
  await initializeDb('database.db');
  console.log('Database initializated...');
  console.log('Creating tables...');
  await createTables();
  console.log('Tables created...');
  console.log('Seeding tables...');
  await seedDatabase();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

init();