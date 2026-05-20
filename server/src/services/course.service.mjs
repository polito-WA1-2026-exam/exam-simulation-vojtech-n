'use strict'

import * as CourseModel from '../models/course.model.mjs'

export const getCourses = async () => {
  return await CourseModel.getAllCourses()
}