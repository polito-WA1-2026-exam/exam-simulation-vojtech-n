import * as CourseModel from '../models/course.model.mjs'

export async function getCourses() {
  return await CourseModel.getAllCourses()
}