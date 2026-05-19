## Good to know
As a general rule: if a field exists in the database but the client has no reason to see it, it stays out of the schema and out of the API response.

## Components
### Courses
- identifier: unique 7-characters code, name, number of credits (int)

### Studyplan
- subset of all courses offered by the university
- total number of credits ranges (included):
  - 60-80, full-time
  - 20-40, part-time
- constraints:
  - course can be incompatible with 1+ courses -- cannot be selected together
  - course can have 1 mandatory preparatory course, which must be already present in the study plan
  - course can have max. number of students able to add it into the study plan

### User Management

## Pages
### Homepage
- unauthenticated: 
  - all coursers that the university offers
  - displayed ordered by course name
  - for each course:
    - code
    - name
    - number of credits
    - number of students enrolled
    - number of students that can select it
    - description can be expanded/contracted
      - shows incompatible and/or preparatory courses (at least their code)
      - many courses can be in expanded state at the same time
- authenticated:
  - same as unauth
  - if no study plan created, student can create an empty one by specifying the full-time or part-time
  - if study plan has already been created and persistently saved, it is immeadiately displayed (same page) and can be edited:
   - always display the number of credits corresponding to the courses in the study plan
   - always display min-max number of allowed credits
   - add a course from the full list to the study plan, only courses that satisfy all constraints can be added
   - remove a course from the study plan
    - if it does not violate any "preparatory" contraint (display reason)
    - if a course cannot be added, it will be marked differently in the full list, and the application should display the reason
  - during editig session, user may:
    - save in persistent way (this will replace any possible previous version)
    - cancel and return to previous persistent copy
  - when saving, plan must be validated according to the min-max number of credits
  - student may delete the entire study plan
  - every action as an authenticated user must end up in logged-in home page

## Database
### Student
- id (TEXT)
- firstname (TEXT)
- surname (TEXT)
- email (TEXT)
- study_plan_id (VARCHAR(7))
- password
- salt
### Passwords -- maybe not necessary
- id (string)
- password (hashed)
### Course
- id (7chars)
- name (TEXT)
- number_of_credits (int)
- incompatible_with (7chars)
- prerequisities_id (7chars)
- number_of_students (calculated)
### Prerequisities
- id (7chars)
- id_prerequisity (7chars)
### Incompatibilities
- id (7chars)
- id_incompatible (7chars)
### Study_Plans
- id (int)
- student (string)
- study_plan (part-time/full-time/null)
- registered_course (7chars)


## Data Models
### Student
### Course

## API
### /students 
- /students // GET
- /students/{student_id} // GET, POST, PUT, DELETE
- /students/{student_id}/plan // GET, POST, PUT, DELETE

### /courses
- /courses // GET
- /courses/{course_id} // GET, POST, PUT, DELETE

### Session storage, like authentication
- /auth // POST
- /auth/logout // POST
