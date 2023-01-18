require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send("Token Required");
    return;
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    }
    req.body.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
