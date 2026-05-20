import { runDb } from './db.mjs';

// Row won't be inserted if it results in a duplicate key
const insertCourse = 'INSERT OR IGNORE INTO course (id, name, no_credits, max_students) VALUES (?, ?, ?, ?)'
const insertIncompability = 'INSERT OR IGNORE INTO incomp (id, incompatibility_id) VALUES (?, ?)'
const insertPrerequisity = 'INSERT OR IGNORE INTO prereq (id, prerequisity_id) VALUES (?, ?)'

async function populateCourse() {
  await Promise.all([
    runDb(insertCourse, ['02GOLOV', 'Architetture dei sistemi di elaborazione', 12, null]),
    runDb(insertCourse, ['02LSEOV', 'Computer architectures', 12, null]),
    runDb(insertCourse, ['01SQJOV', 'Data Science and Database Technology', 8, null]),
    runDb(insertCourse, ['01SQMOV', 'Data Science e Tecnologie per le Basi di Dati', 8, null]),
    runDb(insertCourse, ['01SQLOV', 'Database systems', 8, null]), 	
    runDb(insertCourse, ['01OTWOV', 'Computer network technologies and services', 6, 3]),
    runDb(insertCourse, ['02KPNOV', 'Tecnologie e servizi di rete', 6, 3]),
    runDb(insertCourse, ['01TYMOV', 'Information systems security services', 12, null]),
    runDb(insertCourse, ['01UDUOV', 'Sicurezza dei sistemi informativi', 12, null]), 	
    runDb(insertCourse, ['05BIDOV', 'Ingegneria del software', 6, null]),
    runDb(insertCourse, ['04GSPOV', 'Software engineering', 6, null]),
    runDb(insertCourse, ['01UDFOV', 'Applicazioni Web I', 6, null]),
    runDb(insertCourse, ['01TXYOV', 'Web Applications I', 6, 3]),
    runDb(insertCourse, ['01TXSOV', 'Web Applications II', 6, null]),
    runDb(insertCourse, ['02GRSOV', 'Programmazione di sistema', 6, null]), 	
    runDb(insertCourse, ['01NYHOV', 'System and device programming', 6, 3]), 	
    runDb(insertCourse, ['01SQOOV', 'Reti Locali e Data Center', 6, null]),
    runDb(insertCourse, ['01TYDOV', 'Software networking', 7, null]),
    runDb(insertCourse, ['03UEWOV', 'Challenge', 5, null]),
    runDb(insertCourse, ['01URROV', 'Computational intelligence', 6, null]), 			
    runDb(insertCourse, ['01OUZPD', 'Model based software design', 4, null]),
    runDb(insertCourse, ['01URSPD', 'Internet Video Streaming', 6, 2])
  ])
}

async function populateIncompatibilities() {
  await Promise.all([
    runDb(insertIncompability, ['02GOLOV', '02LSEOV']),
    runDb(insertIncompability, ['01SQJOV', '01SQMOV']),
    runDb(insertIncompability, ['01SQJOV', '01SQLOV']),
    runDb(insertIncompability, ['01SQMOV', '01SQLOV']),
    runDb(insertIncompability, ['01OTWOV', '02KPNOV']),
    runDb(insertIncompability, ['01TYMOV', '01UDUOV']),
    runDb(insertIncompability, ['05BIDOV', '04GSPOV']),
    runDb(insertIncompability, ['01UDFOV', '01TXYOV']),
    runDb(insertIncompability, ['02GRSOV', '01NYHOV']),
  ])
}

async function populatePrerequisities() {
  await Promise.all([
    runDb(insertPrerequisity, ['05BIDOV', '02GOLOV']),
    runDb(insertPrerequisity, ['04GSPOV', '02LSEOV']),
    runDb(insertPrerequisity, ['01TXSOV', '01TXYOV']),
  ])
}

export async function seedDatabase() {
  await Promise.all([
    populateCourse(),
    populateIncompatibilities(),
    populatePrerequisities()
  ])
}