import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { create } from 'domain';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db = null;

export const initializeDb = (dbName) => {
  if (db) return Promise.resolve(db);
  const dbPath = path.join(__dirname, '../../current', dbName);
  console.log(dbPath)
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error initializing the db: ' + err);
        db = null;
        reject(err);
      } else {
        db.run('PRAGMA foreign_keys = ON');
        console.log('DB connected: ' + dbPath);
        resolve(db);
      }
    });
  });
};

export const allDb = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    const stmt = getDb().prepare(sql);
    stmt.all(params, (err, rows) => (err ? reject(err) : resolve(rows)))
  });
}

export const singleDb = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    const stmt = getDb().prepare(sql);
    stmt.get(params, (err, rows) => (err ? reject(err) : resolve(rows)))
  });
}

export const runDb = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    const stmt = getDb().prepare(sql);
    stmt.run(params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const createStudent = `
  CREATE TABLE IF NOT EXISTS student (
    id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    email TEXT,
    study_plan_id VARCHAR(7),
    password TEXT,
    salt TEXT,
    FOREIGN KEY (study_plan_id) REFERENCES st_plan(id)
  );
`

const createCourse = `
  CREATE TABLE IF NOT EXISTS course (
    id VARCHAR(7) PRIMARY KEY,
    name VARCHAR(200) UNIQUE,
    no_credits INTEGER,
    max_students INTEGER
  );
`

    // FOREIGN KEY (id) REFERENCES prereq(id),
    // FOREIGN KEY (id) REFERENCES incomp(id)

const createPrerequisities = `
  CREATE TABLE IF NOT EXISTS prereq (
    id VARCHAR(7),
    prerequisity_id VARCHAR(7),
    PRIMARY KEY (id, prerequisity_id)
    CHECK (id <> prerequisity_id)
  );
`

const createIncompatibilities = `
  CREATE TABLE IF NOT EXISTS incomp (
    id VARCHAR(7),
    incompatibility_id VARCHAR(7),
    PRIMARY KEY (id, incompatibility_id)
    CHECK (id <> incompatibility_id)
  );
`

const createStudyPlans = `
  CREATE TABLE IF NOT EXISTS st_plan (
    id VARCHAR(70) PRIMARY KEY,
    student_id VARCHAR(50),
    study_type VARCHAR(10),
    registered_course VARCHAR(7)
  );
`

const createRegisteredCourses = `
  CREATE TABLE IF NOT EXISTS reg_course (
    s_id VARCHAR(70),
    c_id VARCHAR(7),
    PRIMARY KEY (s_id, c_id),
    FOREIGN KEY (c_id) REFERENCES course(id)
  );
`


const createCourseView = `
  CREATE VIEW IF NOT EXISTS course_w_students AS 
    SELECT 
       c.id
      ,c.name
      ,c.no_credits
      ,c.max_students
      ,COUNT(rc.s_id) AS no_students
    FROM course AS c
    LEFT JOIN reg_course AS rc
      ON c.id = rc.c_id
    GROUP BY c.id, c.name, c.no_credits, c.max_students;
`

export const getDb = () => {
  if (!db) throw new Error("Db isn't initialized!");
  return db;
}

export async function createTables() {
  await Promise.all([
    runDb(createCourse),
    runDb(createPrerequisities),
    runDb(createIncompatibilities),
    runDb(createStudyPlans),
    runDb(createStudent),
    runDb(createRegisteredCourses)
  ]);
  await runDb(createCourseView);
}