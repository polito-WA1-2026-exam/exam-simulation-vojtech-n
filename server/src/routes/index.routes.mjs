import express from 'express';

import authRoutes from './auth.routes.mjs';
import courseRoutes from './course.routes.mjs';
import studentRoutes from './student.routes.mjs';
import repopulateRoutes from '../utils/repopulate-db.mjs';

const router = express.Router()

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);
router.use('/repopulate', repopulateRoutes);

export default router;