const jwt = require("jsonwebtoken");
const User = require("../Backend/Models/User");

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not logged in", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Match any of the common JWT fields
    const userId = decoded.userId || decoded.id || decoded._id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Invalid token payload", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    req.user = user;
    req.userId = user._id;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

// const roleCheck = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     next();
//   };
// };

module.exports = { isLoggedIn };
