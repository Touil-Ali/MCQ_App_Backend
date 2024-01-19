const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log("i got token i m midddlware", token);

  if (!token) {
    return res.status(401).json({
      message: " No token provided",
    });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        message: "Invalide token",
      });
    }

    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;
