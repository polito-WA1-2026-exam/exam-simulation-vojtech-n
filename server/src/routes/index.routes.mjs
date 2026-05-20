import express from 'express'
import courseRoutes from './course.routes.mjs';

const router = express.Router()

router.use('/courses', courseRoutes)

export default router