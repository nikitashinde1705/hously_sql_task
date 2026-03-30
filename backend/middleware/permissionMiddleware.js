const checkPermission = (permission) => {
  return (req, res, next) => {
    const userPermissions = req.user?.Role?.permissions;

    if (!userPermissions || !userPermissions.includes(permission)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};

module.exports = checkPermission;