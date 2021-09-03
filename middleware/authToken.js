require("dotenv").config();
const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //check for token
  if(!token) res.status(401).json({ msg: "No token, authorization denied" });

  //verify token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Token is not valid" }); //token no longer valid
    //user can now proceed
    req.user = user;
    next();
  })
}

module.exports = authToken;