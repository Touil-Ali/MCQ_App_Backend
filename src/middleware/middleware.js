const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: " No token provided",
    });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalide token",
      });
    }

    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;
