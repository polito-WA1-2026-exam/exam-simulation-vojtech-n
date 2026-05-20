'use strict'

import * as courseService from '../services/course.service.mjs'

export const getCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getCourses()
    res.json({ success: true, data: courses })
  } catch (err) {
    next(err);
  }
}