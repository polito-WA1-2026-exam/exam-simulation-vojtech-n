import * as studentService from '../services/student.service.mjs';
import { validateEmail, validateName, validateString } from '../utils/validation.mjs';

export const registerStudent = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!validateName(firstName)) {
    return res.status(400).json({ error: 'Invalid first name!' })
  }

  if (!validateName(lastName)) {
    return res.status(400).json({ error: 'Invalid last name!' })
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email!' })
  }

  if (!validateString(password) || password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters!'})
  }

  try {
    const studentRegistered = await studentService.registerStudent(firstName, lastName, email, password);
    res.json({ success: true, data: `Student with id: ${studentRegistered} registered.` });
  } catch (err) {
    next(err);
  }
}