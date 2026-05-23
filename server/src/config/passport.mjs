import passport from 'passport';
import LocalStrategy from 'passport-local';
import { hashPassword, verifyPassword } from '../utils/crypto.mjs';
import { hasSubscribers } from 'diagnostics_channel';
import { getStudentByEmail, getStudentById } from '../models/student.model.mjs';

passport.use(new LocalStrategy( { usernameField: 'email' }, async (email, password, done) => {
  try {
    const student = await getStudentByEmail(email);

    if (!student) {
      return done(null, false, { message: 'Incorrect email or password!' });
    }

    if (!verifyPassword(password, student.salt, student.password)) {
      return done(null, false, { message: 'Incorrect email or password!'});
    }

    const { password: _, salt: __, ...safeStudent } = student;
    return done(null, safeStudent);

  } catch (err) {
    return done(err);
  }
}));

// what to store in the session cookie
passport.serializeUser((student, done) => {
  done(null, student.id);
});

// how to restore user from session cookie on each request
passport.deserializeUser(async (id, done) => {
  try {
    const safeStudent = await getStudentById(id);
    done(null, safeStudent);
  } catch (err) {
    done(err);
  }
});

export default passport;