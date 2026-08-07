const authMiddleware = (req, res, next) => {
  console.log('Auth middleware ran');
  next();
};

module.exports = authMiddleware;
