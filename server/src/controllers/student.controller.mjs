'use strict'

import * as studentService from '../services/student.service.mjs';

export const registerStudent = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const studentRegistered = studentService.registerStudent(firstName, lastName, email, password);
    res.json({ success: true, data: studentRegistered });
  } catch (err) {
    next(err);
  }
}