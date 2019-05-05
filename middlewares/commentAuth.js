module.exports = (req, res, next) => {
  if (
    req.comment.author._id.equals(req.user.id) ||
    req.post.author._id.equals(req.user.id)
  )
    return next();
  res.status(401).end();
};
