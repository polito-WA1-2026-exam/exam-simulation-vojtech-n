export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Not authenticated' });
};

export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.status(403).json({ error: 'Already authenticated' });
};