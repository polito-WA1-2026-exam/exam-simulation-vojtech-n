import express from 'express';
import passport from '../config/passport.mjs';
import { isLoggedIn } from '../middlewares/auth.mjs';

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { failureMessage: true }),
  (req, res) => {
    res.json(req.user);
  }
);

router.delete('/logout', isLoggedIn, (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'Logged out successfully' });
  });
});

router.get('/current', isLoggedIn, (req, res) => {
  res.json(req.user);
});

export default router;