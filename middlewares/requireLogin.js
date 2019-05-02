module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'You must log in!' });
  }
  return next();
};
