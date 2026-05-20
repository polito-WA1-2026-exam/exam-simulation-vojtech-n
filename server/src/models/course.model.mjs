'use strict'

import { singleDb, allDb, runDb } from "../config/db.mjs";

export const getAllCourses = (whereCondition) => {
  if (!whereCondition) {
    return allDb('SELECT * FROM course ORDER BY name ASC')
  } else {
    return allDb(`SELECT * FROM course WHERE ${whereCondition} ORDER BY name ASC`)
  }
}