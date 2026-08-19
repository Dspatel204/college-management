/**
 * Role-based access control middleware factory.
 * Usage: requireRole('admin') or requireRole('admin', 'teacher')
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}. Your role: ${req.user.role}`,
      });
    }
    next();
  };
};

module.exports = requireRole;
