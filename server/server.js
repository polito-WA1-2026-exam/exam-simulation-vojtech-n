// import app from './app.mjs'
import { initializeDb, createTables } from './src/config/db.mjs';
import { populateCourse, populateIncompatibilities, populatePrerequisities} from './src/config/seed.mjs';

const PORT = 3001;
const DB_NAME = 'database.db';

const start = async () => {
    try {
        let initDb = async function() {
            console.log('Initializing DB:');
            await initializeDb(DB_NAME);
            console.log('Creating tables:');
            await createTables();
            console.log('Populating courses:');
            await populateCourse();
            console.log('Populating prerequisities:');
            await populatePrerequisities();
            console.log('Populating incompabilities:');
            await populateIncompatibilities();
        }
        await initDb();
    } catch (err) {
        console.error('Failed to start server: ', err);
    }
}

start();