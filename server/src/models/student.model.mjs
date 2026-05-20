'use strict'

import { singleDb, allDb, runDb } from "../config/db.mjs";

export async function registerStudent(studentId, firstName, lastName, email, password) {
  return await runDb("INSERT INTO student (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)", [studentId, firstName, lastName, email, password])
}

export async function getStudentId() {
  const result = await singleDb("SELECT MAX(CAST(SUBSTR(id, INSTR(id, 's') + 1) AS INT)) AS id FROM student");
  return result.id;
}