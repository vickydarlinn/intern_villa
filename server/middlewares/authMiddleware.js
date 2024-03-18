const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const userToken = req.headers.authorization;

    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(403).json({ error: error.message, message: "Invalid user" });
  }
};

module.exports = authMiddleware;
