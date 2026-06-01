const jwt = require("jsonwebtoken");

const JWT_SECRET = "mysecretkey";

const authMiddleware = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No Token Provided"
    });
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Invalid Token"
    });

  }
};

module.exports = authMiddleware;