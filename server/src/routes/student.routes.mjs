'use strict'

import express from 'express';
import * as studentController from '../controllers/student.controller.mjs';

const router = express.Router();

export default router.post('/', (req, res, next) => {
  next();
}, studentController.registerStudent);