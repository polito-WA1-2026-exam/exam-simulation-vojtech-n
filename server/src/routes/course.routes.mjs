import express from 'express';
import * as courseController from '../controllers/course.controller.mjs';

const router = express.Router();

export default router.get('/', courseController.getCourses);