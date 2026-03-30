const checkPermission = (permission) => {
  return (req, res, next) => {

    //1. Get user permissions from req.user (set by auth middleware)
    const userPermissions = req.user?.Role?.permissions;

    //2. Check if user has required permission
    if (!userPermissions || !userPermissions.includes(permission)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    //3. If user has permission, proceed to next middleware
    next();
  };
};

module.exports = checkPermission;