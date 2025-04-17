import User from "../models/userModel.js";

const roleAuthorization = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate("role");

      if (!roles.includes(user.role.name)) {
        return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource." });
      }

      next();
    } catch (err) {
      res.status(403).json({ message: "Forbidden: Unable to authorize user." });
    }
  };
};

export default roleAuthorization;
