import * as planService from '../services/plan.service.mjs'

export const updateStudyPlan = (req, res, next) => {
  const { courseIds } = req.body;

  if (!Array.isArray(courseIds)) {
    return res.status(400).json({ error: 'courseIds must be array.' });
  }

  try {
    const result = await planService(req.user.id, courseIds);
    res.json(result);
  } catch (err) {
      next(err);
  }
};