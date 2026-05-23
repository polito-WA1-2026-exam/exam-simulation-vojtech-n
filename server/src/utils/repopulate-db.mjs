import { getDb, runDb, createTables } from '../config/db.mjs';
import { seedDatabase } from '../config/seed.mjs';
import express from 'express';

const router = express.Router();

async function runRepopulate() {
  await Promise.all([
    runDb("DROP TABLE IF EXISTS student"),
    runDb("DROP TABLE IF EXISTS course"),
    runDb("DROP TABLE IF EXISTS prereq"),
    runDb("DROP TABLE IF EXISTS incop"),
    runDb("DROP TABLE IF EXISTS reg_course"),
    runDb("DROP TABLE IF EXISTS st_plan"),
  ])

  await createTables();

  await seedDatabase();
};

const repopulateDatabase = async (req, res, next) => {
  try {
    await runRepopulate()
    res.json({ success: true })
  } catch (err) {
    next(err);
  }
}

export default router.get('/', repopulateDatabase);