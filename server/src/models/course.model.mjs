import { singleDb, allDb, runDb } from "../config/db.mjs";

export async function getAllCourses(whereCondition) {
  if (!whereCondition) {
    return await allDb('SELECT * FROM course_w_students ORDER BY name ASC')
  } else {
    return await allDb(`SELECT * FROM course_w_students WHERE ${whereCondition} ORDER BY name ASC`)
  }
}

export async function getCoursePrerequisities() {

}