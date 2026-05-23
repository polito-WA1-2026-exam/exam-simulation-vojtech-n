import { singleDb, allDb, runDb } from "../config/db.mjs";

export async function registerStudent(studentId, firstName, lastName, email, password, salt) {
  await runDb(
    "INSERT INTO student (id, first_name, last_name, email, password, salt) VALUES (?, ?, ?, ?, ?, ?)",
    [studentId, firstName, lastName, email, password, salt]);

  return studentId;
}

export async function getStudentId() {
  const result = await singleDb("SELECT MAX(CAST(SUBSTR(id, INSTR(id, 's') + 1) AS INT)) AS id FROM student");
  return result.id;
}

export async function verifyExistingEmail(email) {
  const result = await singleDb("SELECT COUNT(email) AS email_count FROM student WHERE email = ?", [email]);
  return result.email_count;
};

export async function getStudentById(id) {
  const result = await singleDb("SELECT id, first_name, last_name, email, study_plan_id FROM student WHERE id = ?", [id]);
  return result;
}

export async function getStudentByEmail(email) {
  const result = await singleDb("SELECT id, email, password, salt FROM student WHERE email = ?", [email]);
  return result;
}