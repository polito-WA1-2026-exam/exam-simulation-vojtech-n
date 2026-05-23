import * as StudentModel from '../models/student.model.mjs';
import { generateSalt, hashPassword } from '../utils/crypto.mjs';

export async function registerStudent(firstName, lastName, email, password) {
  const existing = await StudentModel.verifyExistingEmail(email);
  if (existing > 0)
    throw { status: 409, message: 'Email already registered!' };

  const maxStudentId = await StudentModel.getStudentId();
  let studentId;
  
  if (!maxStudentId) {
    studentId = 's1';
  } else {
    studentId = 's' + (parseInt(maxStudentId) + 1);
  }

  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  return await StudentModel.registerStudent(studentId, firstName, lastName, email, hashedPassword, salt);
}