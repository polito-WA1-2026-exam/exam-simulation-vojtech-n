'use strict'

import * as StudentModel from '../models/student.model.mjs';
import { validateEmail, validateName } from '../utils/validation.mjs';

export const registerStudent = async (firstName, lastName, email, password) => {

  if (!validateEmail(email) || !validateName(firstName) || !validateName(lastName)) {
    Object.assign(new Error('Film with a given id does not exist'), { status: 404 })
  } 

  const maxStudentId = await StudentModel.getStudentId();
  let studentId;
  
  if (!maxStudentId) {
    studentId = 's1';
  } else {
    studentId = 's' + (parseInt(maxStudentId) + 1);
  }

  return await StudentModel.registerStudent(studentId, firstName, lastName, email, password)
}