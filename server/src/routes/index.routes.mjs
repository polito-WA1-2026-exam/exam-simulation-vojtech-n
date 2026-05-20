import express from 'express'
import courseRoutes from './course.routes.mjs';
import studentRoutes from './student.routes.mjs';

const router = express.Router()

router.use('/courses', courseRoutes)
router.use('/students', studentRoutes)

export default router